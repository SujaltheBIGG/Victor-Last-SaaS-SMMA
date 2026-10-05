'use client';

import React, { FC, useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';
import clsx from 'clsx';
import copy from 'copy-to-clipboard';
import { useFetch } from '@gitroom/helpers/utils/custom.fetch';
import { Button } from '@gitroom/react/form/button';
import { useToaster } from '@gitroom/react/toaster/toaster';
import { useT } from '@gitroom/react/translation/get.transation.service.client';
import { LoadingComponent } from '@gitroom/frontend/components/layout/loading';

interface PlatformSettingField {
  key: string;
  label: string;
  secret: boolean;
  optional: boolean;
  options?: string[];
  placeholder?: string;
  source: 'saved' | 'env' | null;
  preview: string;
}

interface PlatformSettingGroup {
  id: string;
  name: string;
  description: string;
  docs?: string;
  configured: boolean;
  callbacks: string[];
  fields: PlatformSettingField[];
}

interface PlatformSettings {
  sections: {
    id: string;
    name: string;
    description: string;
    groups: PlatformSettingGroup[];
  }[];
}

const usePlatformSettings = () => {
  const fetch = useFetch();
  const load = useCallback(async () => {
    return (await fetch('/platform-settings')).json();
  }, []);
  return useSWR<PlatformSettings>('platform-settings', load);
};

const inputClassName =
  'h-[42px] w-full bg-newBgColor border border-newTableBorder rounded-[8px] px-[12px] text-[14px] text-textColor outline-none';

const PlatformSettingsGroupComponent: FC<{
  group: PlatformSettingGroup;
  onSaved: (settings: PlatformSettings) => void;
}> = ({ group, onSaved }) => {
  const t = useT();
  const fetch = useFetch();
  const toaster = useToaster();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  const save = useCallback(
    async (changes: Record<string, string>) => {
      if (!Object.keys(changes).length) {
        return;
      }
      setSaving(true);
      const response = await fetch('/platform-settings', {
        method: 'PUT',
        body: JSON.stringify({ values: changes }),
      });
      setSaving(false);
      if (!response.ok) {
        toaster.show(
          t('api_keys_save_failed', 'Could not save the keys'),
          'warning'
        );
        return;
      }
      onSaved(await response.json());
      setValues({});
      toaster.show(t('api_keys_saved', 'Saved, it applies right away'), 'success');
    },
    [onSaved]
  );

  const setValue = useCallback(
    (key: string) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setValues((current) => ({ ...current, [key]: e.target.value }));
      },
    []
  );

  // The settings modal is wrapped in the profile form, so Enter must not submit it
  const saveOnEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        save(values);
      }
    },
    [save, values]
  );

  return (
    <div className="bg-newBgColorInner border border-newTableBorder rounded-[8px]">
      <div
        className="flex items-center gap-[12px] p-[16px] cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1 flex flex-col gap-[2px]">
          <div className="text-[15px] font-[600]">{group.name}</div>
          <div className="text-[13px] text-textItemBlur">
            {group.description}
          </div>
        </div>
        <div
          className={clsx(
            'text-[12px] px-[10px] py-[4px] rounded-full whitespace-nowrap',
            group.configured
              ? 'bg-[#10b981]/15 text-[#10b981]'
              : 'bg-boxHover text-textItemBlur'
          )}
        >
          {group.configured
            ? t('configured', 'Configured')
            : t('not_configured', 'Not configured')}
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={clsx('transition-transform', open && 'rotate-180')}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
      {open && (
        <div className="border-t border-newTableBorder p-[16px] flex flex-col gap-[16px]">
          {!!group.docs && (
            <a
              href={group.docs}
              target="_blank"
              rel="noreferrer"
              className="text-[13px] underline w-fit"
            >
              {t('get_your_keys', 'Get your keys')} ↗
            </a>
          )}
          {!!group.callbacks.length && (
            <div className="flex flex-col gap-[6px]">
              <div className="text-[13px]">
                {t(
                  'callback_url_hint',
                  'Callback URL, add it to your app on the platform'
                )}
              </div>
              {group.callbacks.map((url) => (
                <div key={url} className="flex items-center gap-[8px]">
                  <div className="flex-1 min-w-0 truncate bg-newBgColor border border-newTableBorder rounded-[8px] px-[12px] py-[8px] text-[12px] font-mono">
                    {url}
                  </div>
                  <Button
                    secondary
                    className="rounded-[8px] !h-[36px]"
                    onClick={() => {
                      copy(url);
                      toaster.show(t('copied', 'Copied'), 'success');
                    }}
                  >
                    {t('copy', 'Copy')}
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div className="grid grid-cols-2 mobile:grid-cols-1 gap-[12px]">
            {group.fields.map((field) => (
              <div key={field.key} className="flex flex-col gap-[6px]">
                <div className="text-[13px] flex gap-[6px]">
                  {field.label}
                  {field.optional && (
                    <span className="text-textItemBlur">
                      ({t('optional', 'optional')})
                    </span>
                  )}
                </div>
                {field.options ? (
                  <select
                    className={inputClassName}
                    value={values[field.key] ?? field.preview}
                    onChange={setValue(field.key)}
                  >
                    <option value="">{t('not_set', 'Not set')}</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className={inputClassName}
                    type={field.secret ? 'password' : 'text'}
                    autoComplete="new-password"
                    value={values[field.key] ?? ''}
                    placeholder={field.preview || field.placeholder || ''}
                    onChange={setValue(field.key)}
                    onKeyDown={saveOnEnter}
                  />
                )}
                <div className="text-[12px] text-textItemBlur flex gap-[6px] min-h-[16px]">
                  {field.source === 'env' &&
                    t('set_in_env_file', 'Set in the .env file')}
                  {field.source === 'saved' && (
                    <>
                      {t('saved_here', 'Saved here')} ·
                      <span
                        className="underline cursor-pointer"
                        onClick={() => save({ [field.key]: '' })}
                      >
                        {t('remove', 'Remove')}
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button
              className="rounded-[8px]"
              loading={saving}
              disabled={!Object.keys(values).length}
              onClick={() => save(values)}
            >
              {t('save', 'Save')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export const PlatformSettingsComponent: FC = () => {
  const t = useT();
  const { data, isLoading, mutate } = usePlatformSettings();
  const [search, setSearch] = useState('');

  const onSaved = useCallback(
    (settings: PlatformSettings) => mutate(settings, { revalidate: false }),
    [mutate]
  );

  const sections = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (data?.sections || [])
      .map((section) => ({
        ...section,
        groups: section.groups.filter(
          (group) =>
            !query ||
            `${group.name} ${group.description}`.toLowerCase().includes(query)
        ),
      }))
      .filter((section) => section.groups.length);
  }, [data, search]);

  if (isLoading || !data) {
    return <LoadingComponent />;
  }

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[4px]">
        <h3 className="text-[20px]">{t('api_keys', 'API Keys')}</h3>
        <div className="text-textItemBlur text-[14px]">
          {t(
            'api_keys_description',
            'Connect AI providers and social platforms. Saved keys are encrypted, apply right away and override the .env file. Only super admins see this page.'
          )}
        </div>
      </div>
      <input
        className={inputClassName}
        placeholder={t('search_platforms', 'Search platforms')}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
      />
      {sections.map((section) => (
        <div key={section.id} className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[2px]">
            <div className="text-[16px] font-[600]">{section.name}</div>
            <div className="text-[13px] text-textItemBlur">
              {section.description}
            </div>
          </div>
          {section.groups.map((group) => (
            <PlatformSettingsGroupComponent
              key={group.id}
              group={group}
              onSaved={onSaved}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
