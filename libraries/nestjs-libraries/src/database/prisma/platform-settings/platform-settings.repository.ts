import { PrismaRepository } from '@gitroom/nestjs-libraries/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlatformSettingsRepository {
  constructor(private _platformSetting: PrismaRepository<'platformSetting'>) {}

  getSettings() {
    return this._platformSetting.model.platformSetting.findMany({
      select: {
        key: true,
        value: true,
      },
    });
  }

  saveSetting(key: string, value: string) {
    return this._platformSetting.model.platformSetting.upsert({
      where: {
        key,
      },
      create: {
        key,
        value,
      },
      update: {
        value,
      },
      select: {
        key: true,
      },
    });
  }

  deleteSetting(key: string) {
    return this._platformSetting.model.platformSetting.deleteMany({
      where: {
        key,
      },
    });
  }
}
