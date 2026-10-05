import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { AuthService } from '@gitroom/helpers/auth/auth.service';
import { PlatformSettingsRepository } from '@gitroom/nestjs-libraries/database/prisma/platform-settings/platform-settings.repository';
import {
  PlatformSettingField,
  PlatformSettingGroup,
  platformSettingsKeys,
  platformSettingsList,
  platformSettingsSections,
} from '@gitroom/nestjs-libraries/database/prisma/platform-settings/platform-settings.list';

// Saved keys are applied to process.env, so every integration reads them
// like any other environment variable. Other processes (orchestrator, more
// backend instances) pick up changes on the next sync.
const SYNC_INTERVAL = 30000;

@Injectable()
export class PlatformSettingsService implements OnModuleInit, OnModuleDestroy {
  private _envValues: Record<string, string | undefined> = {};
  private _savedKeys = new Set<string>();
  private _interval?: NodeJS.Timeout;

  constructor(private _platformSettingsRepository: PlatformSettingsRepository) {
    for (const key of platformSettingsKeys) {
      this._envValues[key] = process.env[key];
    }
  }

  async onModuleInit() {
    await this.syncSettings();
    this._interval = setInterval(() => this.syncSettings(), SYNC_INTERVAL);
    this._interval.unref();
  }

  onModuleDestroy() {
    clearInterval(this._interval);
  }

  async syncSettings() {
    try {
      const saved = new Map<string, string>();
      for (const { key, value } of await this._platformSettingsRepository.getSettings()) {
        try {
          saved.set(key, AuthService.fixedDecryption(value));
        } catch (err) {
          Logger.warn(`Could not decrypt the saved value of ${key}`);
        }
      }

      this._savedKeys = new Set(saved.keys());
      for (const key of platformSettingsKeys) {
        const value = saved.get(key) ?? this._envValues[key];
        if (value === undefined) {
          delete process.env[key];
        } else {
          process.env[key] = value;
        }
      }
    } catch (err) {
      Logger.error(`Could not load platform settings: ${(err as Error).message}`);
    }
  }

  private isSet(field: PlatformSettingField) {
    return !!process.env[field.key] || (!!field.fallback && !!process.env[field.fallback]);
  }

  private isConfigured(group: PlatformSettingGroup) {
    return group.fields.every((field) => field.optional || this.isSet(field));
  }

  // Keys a social provider still needs before users can connect it
  missingKeys(providerIdentifier: string) {
    return platformSettingsList
      .filter((group) => group.providers?.includes(providerIdentifier))
      .flatMap((group) => group.fields)
      .filter((field) => !field.optional && !this.isSet(field))
      .map((field) => field.key);
  }

  getSettings() {
    return {
      sections: platformSettingsSections.map((section) => ({
        ...section,
        groups: platformSettingsList
          .filter((group) => group.section === section.id)
          .map((group) => ({
            id: group.id,
            name: group.name,
            description: group.description,
            docs: group.docs,
            configured: this.isConfigured(group),
            callbacks: group.callback
              ? group.providers!.map(
                  (provider) =>
                    `${process.env.FRONTEND_URL}/integrations/social/${provider}`
                )
              : [],
            fields: group.fields.map((field) => {
              const value = process.env[field.key];
              return {
                key: field.key,
                label: field.label,
                secret: !!field.secret,
                optional: !!field.optional,
                options: field.options,
                placeholder: field.placeholder,
                source: this._savedKeys.has(field.key)
                  ? 'saved'
                  : value
                  ? 'env'
                  : null,
                preview: !value
                  ? ''
                  : field.secret
                  ? `••••${value.length > 8 ? value.slice(-4) : ''}`
                  : value,
              };
            }),
          })),
      })),
    };
  }

  async updateSettings(values: Record<string, string>) {
    const fields = platformSettingsList.flatMap((group) => group.fields);
    for (const [key, raw] of Object.entries(values)) {
      const field = fields.find((f) => f.key === key);
      const value = typeof raw === 'string' ? raw.trim() : '';
      if (!field || (value && field.options && !field.options.includes(value))) {
        continue;
      }

      // an empty value removes the saved one, the .env value applies again
      if (!value) {
        await this._platformSettingsRepository.deleteSetting(key);
      } else {
        await this._platformSettingsRepository.saveSetting(
          key,
          AuthService.fixedEncryption(value)
        );
      }
    }

    await this.syncSettings();
    return this.getSettings();
  }

  // Values the frontend layout needs, nothing secret
  getPublicSettings() {
    return {
      values: Object.fromEntries(
        platformSettingsList
          .flatMap((group) => group.fields)
          .filter((field) => field.public)
          .map((field) => [field.key, process.env[field.key] || ''])
      ),
      configured: Object.fromEntries(
        platformSettingsList.map((group) => [group.id, this.isConfigured(group)])
      ),
      notConfiguredProviders: platformSettingsList
        .flatMap((group) => group.providers || [])
        .filter((provider) => this.missingKeys(provider).length),
    };
  }
}
