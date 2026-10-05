import { SentryComponent } from '@gitroom/frontend/components/layout/sentry.component';

export const dynamic = 'force-dynamic';
import '../global.scss';
import 'react-tooltip/dist/react-tooltip.css';
import '@copilotkit/react-ui/styles.css';
import LayoutContext from '@gitroom/frontend/components/layout/layout.context';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import PlausibleProvider from 'next-plausible';
import clsx from 'clsx';
import { VariableContextComponent } from '@gitroom/react/helpers/variable.context';
import { Fragment } from 'react';
import { PHProvider } from '@gitroom/react/helpers/posthog';
import UtmSaver from '@gitroom/helpers/utils/utm.saver';
import { DubAnalytics } from '@gitroom/frontend/components/layout/dubAnalytics';
import { FacebookComponent } from '@gitroom/frontend/components/layout/facebook.component';
import { GoogleTagManagerComponent } from '@gitroom/frontend/components/layout/gtm.component';
import { cookies } from 'next/headers';
import {
  cookieName,
  fallbackLng,
} from '@gitroom/react/translation/i18n.config';
import { HtmlComponent } from '@gitroom/frontend/components/layout/html.component';
import Script from 'next/script';
import { internalFetch } from '@gitroom/helpers/utils/internal.fetch';
import { ChangeDirClient } from '@gitroom/frontend/components/new-layout/change.dir.client';

const jakartaSans = Plus_Jakarta_Sans({
  weight: ['600', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Castora - Social Media Scheduling with AI';
  const description =
    'Plan, create and publish to every social channel from one calendar, with AI agents built in.';
  return {
    metadataBase: new URL(process.env.FRONTEND_URL || 'http://localhost:4200'),
    title,
    description,
    applicationName: 'Castora',
    openGraph: {
      type: 'website',
      siteName: 'Castora',
      title,
      description,
      images: [
        { url: '/og-image.png', width: 1200, height: 630, alt: 'Castora' },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}

// Public values saved in Settings > API Keys, the .env file is the fallback
const loadPlatformSettings = async (): Promise<{
  values: Record<string, string>;
  notConfiguredProviders: string[];
}> => {
  try {
    const settings = await (
      await internalFetch('/public/platform-settings')
    ).json();
    return {
      values: settings.values || {},
      notConfiguredProviders: settings.notConfiguredProviders || [],
    };
  } catch (err) {
    return { values: {}, notConfiguredProviders: [] };
  }
};

export default async function AppLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const language = cookieStore.get(cookieName)?.value || fallbackLng;
  const platform = await loadPlatformSettings();
  const transloaditAuth =
    platform.values.TRANSLOADIT_AUTH || process.env.TRANSLOADIT_AUTH;
  const transloaditTemplate =
    platform.values.TRANSLOADIT_TEMPLATE || process.env.TRANSLOADIT_TEMPLATE;
  const Plausible = !!process.env.STRIPE_PUBLISHABLE_KEY
    ? PlausibleProvider
    : Fragment;
  return (
    <html>
      <head>
        <link rel="icon" href="/favicon.ico?v=castora" sizes="any" />
        <link rel="apple-touch-icon" href="/icon-1024.png" />
        {!!process.env.DATAFAST_WEBSITE_ID && (
          <Script
            data-website-id={process.env.DATAFAST_WEBSITE_ID}
            data-domain={new URL(process.env.FRONTEND_URL!).hostname}
            src="https://datafa.st/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </head>
      <ChangeDirClient />
      <body
        className={clsx(jakartaSans.className, 'dark text-primary !bg-primary')}
      >
        <VariableContextComponent
          storageProvider={
            process.env.STORAGE_PROVIDER! as 'local' | 'cloudflare'
          }
          environment={process.env.NODE_ENV!}
          backendUrl={process.env.NEXT_PUBLIC_BACKEND_URL!}
          plontoKey={
            platform.values.NEXT_PUBLIC_POLOTNO || process.env.NEXT_PUBLIC_POLOTNO!
          }
          stripeClient={process.env.STRIPE_PUBLISHABLE_KEY!}
          isChatBase={!!process.env.CHATBASE_TOKEN}
          billingEnabled={!!process.env.STRIPE_PUBLISHABLE_KEY}
          discordUrl={process.env.NEXT_PUBLIC_DISCORD_SUPPORT!}
          frontEndUrl={process.env.FRONTEND_URL!}
          isGeneral={!!process.env.IS_GENERAL}
          genericOauth={!!process.env.POSTIZ_GENERIC_OAUTH}
          oauthLogoUrl={process.env.NEXT_PUBLIC_POSTIZ_OAUTH_LOGO_URL!}
          oauthDisplayName={process.env.NEXT_PUBLIC_POSTIZ_OAUTH_DISPLAY_NAME!}
          uploadDirectory={process.env.NEXT_PUBLIC_UPLOAD_STATIC_DIRECTORY!}
          cloudflareUrl={process.env.CLOUDFLARE_BUCKET_URL || ''}
          mainUrl={process.env.MAIN_URL || ''}
          mcpUrl={process.env.MCP_URL}
          dub={false}
          facebookPixel={process.env.NEXT_PUBLIC_FACEBOOK_PIXEL!}
          telegramBotName={
            platform.values.TELEGRAM_BOT_NAME || process.env.TELEGRAM_BOT_NAME!
          }
          neynarClientId={
            platform.values.NEYNAR_CLIENT_ID || process.env.NEYNAR_CLIENT_ID!
          }
          appleClientId={process.env.APPLE_CLIENT_ID!}
          isSecured={!process.env.NOT_SECURED}
          disableImageCompression={!!process.env.DISABLE_IMAGE_COMPRESSION}
          disableXAnalytics={!!process.env.DISABLE_X_ANALYTICS}
          sentryDsn={process.env.NEXT_PUBLIC_SENTRY_DSN!}
          extensionId={process.env.EXTENSION_ID || ''}
          googleAdsId={process.env.NEXT_PUBLIC_GTM_ID}
          googleAdsTrialTracking={process.env.NEXT_PUBLIC_TRACKING_TRIAL}
          language={language}
          recaptchaSiteKey={process.env.RECAPTCHA_SITE_KEY || ''}
          termsUrl={process.env.TERMS_URL || '/terms'}
          privacyUrl={process.env.PRIVACY_URL || '/privacy'}
          notConfiguredProviders={platform.notConfiguredProviders}
          mediaProcessing={
            process.env.STORAGE_PROVIDER === 'cloudflare' &&
            !!process.env.RUNPOD_API_KEY &&
            !!process.env.RUNPOD_ENDPOINT_ID
          }
          transloadit={
            transloaditAuth && transloaditTemplate
              ? [transloaditAuth, transloaditTemplate]
              : []
          }
        >
          <SentryComponent>
            {/*<SetTimezone />*/}
            <HtmlComponent />
            <DubAnalytics />
            <FacebookComponent />
            <GoogleTagManagerComponent gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
            <Plausible
              domain={new URL(process.env.FRONTEND_URL!).hostname}
            >
              <PHProvider
                phkey={process.env.NEXT_PUBLIC_POSTHOG_KEY}
                host={process.env.NEXT_PUBLIC_POSTHOG_HOST}
              >
                <LayoutContext>
                  <UtmSaver />
                  {children}
                </LayoutContext>
              </PHProvider>
            </Plausible>
          </SentryComponent>
        </VariableContextComponent>
      </body>
    </html>
  );
}
