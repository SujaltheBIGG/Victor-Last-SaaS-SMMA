import { getT } from '@gitroom/react/translation/get.translation.service.backend';

export const dynamic = 'force-dynamic';
import { ReactNode } from 'react';
import loadDynamic from 'next/dynamic';
import { LogoTextComponent } from '@gitroom/frontend/components/ui/logo-text.component';
import { MantineWrapper } from '@gitroom/react/helpers/mantine.wrapper';
import { Toaster } from '@gitroom/react/toaster/toaster';
const ReturnUrlComponent = loadDynamic(() => import('./return.url.component'));
export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getT();

  return (
    <MantineWrapper>
      <Toaster />
      <div className="bg-[#0E0E0E] flex flex-1 p-[12px] gap-[12px] min-h-screen w-screen text-white">
        {/*<style>{`html, body {overflow-x: hidden;}`}</style>*/}
        <ReturnUrlComponent />
        <div className="flex flex-col py-[40px] px-[20px] flex-1 lg:w-[600px] lg:flex-none rounded-[12px] text-white p-[12px] bg-[#1A1919]">
          <div className="w-full max-w-[440px] mx-auto justify-center gap-[20px] h-full flex flex-col text-white">
            <LogoTextComponent />
            <div className="flex">{children}</div>
          </div>
        </div>
        <div className="text-[36px] flex-1 pt-[88px] px-[40px] hidden lg:flex flex-col items-center">
          <div className="text-center">
            {t('auth_headline_plan_create', 'Plan, Create and Publish')}
            <br />
            {t('auth_headline_everywhere', 'Everywhere With')}{' '}
            <span className="text-[42px] text-[#FC69FF]">Castora</span>
          </div>
          <div className="grid grid-cols-2 gap-[16px] mt-[56px] max-w-[760px] w-full">
            {[
              [
                t('auth_feature_calendar', 'One calendar for every channel'),
                t(
                  'auth_feature_calendar_desc',
                  'Schedule posts to all your social accounts from a single calendar.'
                ),
              ],
              [
                t('auth_feature_ai', 'AI agents built in'),
                t(
                  'auth_feature_ai_desc',
                  'Generate posts, images and videos, and let agents schedule for you.'
                ),
              ],
              [
                t('auth_feature_analytics', 'Analytics that matter'),
                t(
                  'auth_feature_analytics_desc',
                  'See what performs on each channel and double down on it.'
                ),
              ],
              [
                t('auth_feature_team', 'Built for teams'),
                t(
                  'auth_feature_team_desc',
                  'Invite your team, collaborate on content and manage clients.'
                ),
              ],
            ].map(([title, description]) => (
              <div
                key={title}
                className="bg-[#1A1919] rounded-[12px] p-[24px] flex flex-col gap-[8px]"
              >
                <div className="text-[18px] font-[600]">{title}</div>
                <div className="text-[14px] text-[#A3A3A3] leading-[150%]">
                  {description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MantineWrapper>
  );
}
