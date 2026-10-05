// Every third-party key an admin can set from Settings > API Keys.
// A saved value overrides the same variable from the .env file.

export interface PlatformSettingField {
  key: string;
  label: string;
  secret?: boolean;
  // safe to send to the browser (the frontend layout needs it)
  public?: boolean;
  optional?: boolean;
  // the field also counts as set when this other key is set
  fallback?: string;
  options?: string[];
  placeholder?: string;
}

export interface PlatformSettingGroup {
  id: string;
  section: 'ai' | 'email' | 'channels' | 'links';
  name: string;
  description: string;
  docs?: string;
  // social provider identifiers that need this group to connect
  providers?: string[];
  // providers connect through an OAuth redirect to FRONTEND_URL
  callback?: boolean;
  fields: PlatformSettingField[];
}

export const platformSettingsSections = [
  {
    id: 'ai',
    name: 'AI',
    description: 'Keys for the AI assistant, agents, images and videos.',
  },
  {
    id: 'email',
    name: 'Email',
    description:
      'Sends account activation, password reset, team invites and notifications.',
  },
  {
    id: 'channels',
    name: 'Social channels',
    description:
      'Create a developer app on each platform, add the callback URL to it, then paste its keys here. Bluesky, Lemmy, Nostr, WordPress and similar channels need no platform keys, users sign in with their own account.',
  },
  {
    id: 'links',
    name: 'Short links',
    description:
      'Shorten and track links in posts. The first configured service is used.',
  },
];

export const platformSettingsList: PlatformSettingGroup[] = [
  {
    id: 'openai',
    section: 'ai',
    name: 'OpenAI or Gemini',
    description:
      'Powers the AI assistant, AI agents, Auto Post, post generation and images. For Google Gemini (free tier), use an AI Studio key, base URL https://generativelanguage.googleapis.com/v1beta/openai/ and text model gemini-3.5-flash-lite.',
    docs: 'https://platform.openai.com/api-keys',
    fields: [
      { key: 'OPENAI_API_KEY', label: 'API key', secret: true },
      {
        key: 'OPENAI_BASE_URL',
        label: 'Base URL (other providers)',
        optional: true,
        placeholder: 'Empty for OpenAI',
      },
      {
        key: 'OPENAI_MODEL',
        label: 'Text model',
        optional: true,
        placeholder: 'Empty for the OpenAI defaults',
      },
      {
        key: 'OPENAI_IMAGE_MODEL',
        label: 'Image model',
        optional: true,
        placeholder: 'chatgpt-image-latest',
      },
    ],
  },
  {
    id: 'tavily',
    section: 'ai',
    name: 'Tavily',
    description: 'Lets AI agents search the web while researching posts.',
    docs: 'https://app.tavily.com',
    fields: [{ key: 'TAVILY_API_KEY', label: 'API key', secret: true }],
  },
  {
    id: 'fal',
    section: 'ai',
    name: 'fal.ai',
    description: 'AI image and video generation.',
    docs: 'https://fal.ai/dashboard/keys',
    fields: [{ key: 'FAL_KEY', label: 'API key', secret: true }],
  },
  {
    id: 'elevenlabs',
    section: 'ai',
    name: 'ElevenLabs',
    description:
      'Voice-overs for AI video slides (also needs OpenAI, fal.ai and Transloadit).',
    docs: 'https://elevenlabs.io/app/settings/api-keys',
    fields: [{ key: 'ELEVENSLABS_API_KEY', label: 'API key', secret: true }],
  },
  {
    id: 'transloadit',
    section: 'ai',
    name: 'Transloadit',
    description:
      'Renders AI video slides. When set, media uploads also go through Transloadit.',
    docs: 'https://transloadit.com/c/',
    fields: [
      { key: 'TRANSLOADIT_AUTH', label: 'Auth key', public: true },
      { key: 'TRANSLOADIT_SECRET', label: 'Auth secret', secret: true },
      { key: 'TRANSLOADIT_TEMPLATE', label: 'Template ID', public: true },
    ],
  },
  {
    id: 'evolink',
    section: 'ai',
    name: 'Evolink (Seedance)',
    description: 'Text-to-video generation with the Seedance model.',
    docs: 'https://evolink.ai',
    fields: [{ key: 'EVOLINK_API_KEY', label: 'API key', secret: true }],
  },
  {
    id: 'polotno',
    section: 'ai',
    name: 'Polotno',
    description: 'Design editor for creating images inside the media library.',
    docs: 'https://polotno.com/cabinet',
    fields: [{ key: 'NEXT_PUBLIC_POLOTNO', label: 'API key', public: true }],
  },
  {
    id: 'email',
    section: 'email',
    name: 'Email delivery',
    description:
      'Use Resend (only an API key) or any SMTP server. Once set, new users must confirm their email address.',
    docs: 'https://resend.com/api-keys',
    fields: [
      {
        key: 'EMAIL_PROVIDER',
        label: 'Provider',
        options: ['resend', 'nodemailer'],
      },
      { key: 'EMAIL_FROM_ADDRESS', label: 'From address' },
      { key: 'EMAIL_FROM_NAME', label: 'From name' },
      {
        key: 'RESEND_API_KEY',
        label: 'Resend API key',
        secret: true,
        optional: true,
      },
      { key: 'EMAIL_HOST', label: 'SMTP host', optional: true },
      { key: 'EMAIL_PORT', label: 'SMTP port', optional: true },
      {
        key: 'EMAIL_SECURE',
        label: 'SMTP secure (TLS)',
        options: ['true', 'false'],
        optional: true,
      },
      { key: 'EMAIL_USER', label: 'SMTP user', optional: true },
      {
        key: 'EMAIL_PASS',
        label: 'SMTP password',
        secret: true,
        optional: true,
      },
    ],
  },
  {
    id: 'x',
    section: 'channels',
    name: 'X (Twitter)',
    description: 'Post to X accounts.',
    docs: 'https://developer.x.com/en/portal/dashboard',
    providers: ['x'],
    callback: true,
    fields: [
      { key: 'X_API_KEY', label: 'API key' },
      { key: 'X_API_SECRET', label: 'API key secret', secret: true },
    ],
  },
  {
    id: 'linkedin',
    section: 'channels',
    name: 'LinkedIn',
    description: 'Post to LinkedIn profiles and company pages.',
    docs: 'https://www.linkedin.com/developers/apps',
    providers: ['linkedin', 'linkedin-page'],
    callback: true,
    fields: [
      { key: 'LINKEDIN_CLIENT_ID', label: 'Client ID' },
      { key: 'LINKEDIN_CLIENT_SECRET', label: 'Client secret', secret: true },
    ],
  },
  {
    id: 'facebook',
    section: 'channels',
    name: 'Facebook & Instagram (Business)',
    description:
      'Post to Facebook pages and to Instagram business accounts linked to a page.',
    docs: 'https://developers.facebook.com/apps',
    providers: ['facebook', 'instagram'],
    callback: true,
    fields: [
      { key: 'FACEBOOK_APP_ID', label: 'App ID' },
      { key: 'FACEBOOK_APP_SECRET', label: 'App secret', secret: true },
    ],
  },
  {
    id: 'instagram-standalone',
    section: 'channels',
    name: 'Instagram (direct login)',
    description: 'Post to Instagram accounts without a Facebook page.',
    docs: 'https://developers.facebook.com/apps',
    providers: ['instagram-standalone'],
    callback: true,
    fields: [
      { key: 'INSTAGRAM_APP_ID', label: 'App ID' },
      { key: 'INSTAGRAM_APP_SECRET', label: 'App secret', secret: true },
    ],
  },
  {
    id: 'threads',
    section: 'channels',
    name: 'Threads',
    description: 'Post to Threads accounts.',
    docs: 'https://developers.facebook.com/apps',
    providers: ['threads'],
    callback: true,
    fields: [
      { key: 'THREADS_APP_ID', label: 'App ID' },
      { key: 'THREADS_APP_SECRET', label: 'App secret', secret: true },
    ],
  },
  {
    id: 'youtube',
    section: 'channels',
    name: 'YouTube',
    description: 'Upload videos to YouTube channels.',
    docs: 'https://console.cloud.google.com/apis/credentials',
    providers: ['youtube'],
    callback: true,
    fields: [
      { key: 'YOUTUBE_CLIENT_ID', label: 'Client ID' },
      { key: 'YOUTUBE_CLIENT_SECRET', label: 'Client secret', secret: true },
    ],
  },
  {
    id: 'gmb',
    section: 'channels',
    name: 'Google Business Profile',
    description:
      'Post to Google Business profiles. Leave empty to reuse the YouTube keys.',
    docs: 'https://console.cloud.google.com/apis/credentials',
    providers: ['gmb'],
    callback: true,
    fields: [
      {
        key: 'GOOGLE_GMB_CLIENT_ID',
        label: 'Client ID',
        fallback: 'YOUTUBE_CLIENT_ID',
      },
      {
        key: 'GOOGLE_GMB_CLIENT_SECRET',
        label: 'Client secret',
        secret: true,
        fallback: 'YOUTUBE_CLIENT_SECRET',
      },
    ],
  },
  {
    id: 'tiktok',
    section: 'channels',
    name: 'TikTok',
    description: 'Post videos and photos to TikTok accounts.',
    docs: 'https://developers.tiktok.com/apps',
    providers: ['tiktok'],
    callback: true,
    fields: [
      { key: 'TIKTOK_CLIENT_ID', label: 'Client key' },
      { key: 'TIKTOK_CLIENT_SECRET', label: 'Client secret', secret: true },
    ],
  },
  {
    id: 'tiktok-business',
    section: 'channels',
    name: 'TikTok Business',
    description: 'Post to TikTok business accounts.',
    docs: 'https://business-api.tiktok.com/portal',
    providers: ['tiktok-business'],
    callback: true,
    fields: [
      { key: 'TIKTOK_BUSINESS_CLIENT_ID', label: 'App ID' },
      {
        key: 'TIKTOK_BUSINESS_CLIENT_SECRET',
        label: 'Secret',
        secret: true,
      },
    ],
  },
  {
    id: 'pinterest',
    section: 'channels',
    name: 'Pinterest',
    description: 'Create pins on Pinterest boards.',
    docs: 'https://developers.pinterest.com/apps/',
    providers: ['pinterest'],
    callback: true,
    fields: [
      { key: 'PINTEREST_CLIENT_ID', label: 'App ID' },
      { key: 'PINTEREST_CLIENT_SECRET', label: 'App secret', secret: true },
    ],
  },
  {
    id: 'reddit',
    section: 'channels',
    name: 'Reddit',
    description: 'Post to subreddits.',
    docs: 'https://www.reddit.com/prefs/apps',
    providers: ['reddit'],
    callback: true,
    fields: [
      { key: 'REDDIT_CLIENT_ID', label: 'Client ID' },
      { key: 'REDDIT_CLIENT_SECRET', label: 'Client secret', secret: true },
    ],
  },
  {
    id: 'dribbble',
    section: 'channels',
    name: 'Dribbble',
    description: 'Post shots to Dribbble.',
    docs: 'https://dribbble.com/account/applications',
    providers: ['dribbble'],
    callback: true,
    fields: [
      { key: 'DRIBBBLE_CLIENT_ID', label: 'Client ID' },
      { key: 'DRIBBBLE_CLIENT_SECRET', label: 'Client secret', secret: true },
    ],
  },
  {
    id: 'tumblr',
    section: 'channels',
    name: 'Tumblr',
    description: 'Post to Tumblr blogs.',
    docs: 'https://www.tumblr.com/oauth/apps',
    providers: ['tumblr'],
    callback: true,
    fields: [
      { key: 'TUMBLR_CLIENT_ID', label: 'Consumer key' },
      { key: 'TUMBLR_CLIENT_SECRET', label: 'Consumer secret', secret: true },
    ],
  },
  {
    id: 'discord',
    section: 'channels',
    name: 'Discord',
    description: 'Post to Discord channels through your bot.',
    docs: 'https://discord.com/developers/applications',
    providers: ['discord'],
    callback: true,
    fields: [
      { key: 'DISCORD_CLIENT_ID', label: 'Client ID' },
      { key: 'DISCORD_CLIENT_SECRET', label: 'Client secret', secret: true },
      { key: 'DISCORD_BOT_TOKEN_ID', label: 'Bot token', secret: true },
    ],
  },
  {
    id: 'slack',
    section: 'channels',
    name: 'Slack',
    description: 'Post to Slack channels.',
    docs: 'https://api.slack.com/apps',
    providers: ['slack'],
    callback: true,
    fields: [
      { key: 'SLACK_ID', label: 'Client ID' },
      { key: 'SLACK_SECRET', label: 'Client secret', secret: true },
      {
        key: 'SLACK_SIGNING_SECRET',
        label: 'Signing secret',
        secret: true,
        optional: true,
      },
    ],
  },
  {
    id: 'mastodon',
    section: 'channels',
    name: 'Mastodon',
    description:
      'Post to Mastodon. Create the app on your instance under Preferences > Development.',
    docs: 'https://mastodon.social/settings/applications',
    providers: ['mastodon'],
    callback: true,
    fields: [
      {
        key: 'MASTODON_URL',
        label: 'Instance URL',
        placeholder: 'https://mastodon.social',
      },
      { key: 'MASTODON_CLIENT_ID', label: 'Client key' },
      { key: 'MASTODON_CLIENT_SECRET', label: 'Client secret', secret: true },
    ],
  },
  {
    id: 'telegram',
    section: 'channels',
    name: 'Telegram',
    description:
      'Post to Telegram channels and groups through your bot. Create the bot with @BotFather.',
    docs: 'https://t.me/BotFather',
    providers: ['telegram'],
    fields: [
      { key: 'TELEGRAM_TOKEN', label: 'Bot token', secret: true },
      {
        key: 'TELEGRAM_BOT_NAME',
        label: 'Bot username',
        public: true,
        placeholder: 'my_castora_bot',
      },
    ],
  },
  {
    id: 'twitch',
    section: 'channels',
    name: 'Twitch',
    description: 'Post to Twitch channel chats.',
    docs: 'https://dev.twitch.tv/console/apps',
    providers: ['twitch'],
    callback: true,
    fields: [
      { key: 'TWITCH_CLIENT_ID', label: 'Client ID' },
      { key: 'TWITCH_CLIENT_SECRET', label: 'Client secret', secret: true },
    ],
  },
  {
    id: 'kick',
    section: 'channels',
    name: 'Kick',
    description: 'Post to Kick channel chats.',
    docs: 'https://kick.com/settings/developer',
    providers: ['kick'],
    callback: true,
    fields: [
      { key: 'KICK_CLIENT_ID', label: 'Client ID' },
      { key: 'KICK_SECRET', label: 'Client secret', secret: true },
    ],
  },
  {
    id: 'vk',
    section: 'channels',
    name: 'VK',
    description: 'Post to VK pages.',
    docs: 'https://id.vk.com/about/business/go',
    providers: ['vk'],
    callback: true,
    fields: [{ key: 'VK_ID', label: 'App ID' }],
  },
  {
    id: 'farcaster',
    section: 'channels',
    name: 'Farcaster (Neynar)',
    description: 'Post to Farcaster (Warpcast) through Neynar.',
    docs: 'https://dev.neynar.com',
    providers: ['wrapcast'],
    fields: [
      { key: 'NEYNAR_CLIENT_ID', label: 'Client ID', public: true },
      { key: 'NEYNAR_SECRET_KEY', label: 'API key', secret: true },
      { key: 'NEYNAR_APP_FID', label: 'App FID', optional: true },
      {
        key: 'NEYNAR_APP_MNEMONIC',
        label: 'App mnemonic',
        secret: true,
        optional: true,
      },
    ],
  },
  {
    id: 'mewe',
    section: 'channels',
    name: 'MeWe',
    description: 'Post to MeWe.',
    providers: ['mewe'],
    callback: true,
    fields: [
      { key: 'MEWE_APP_ID', label: 'App ID' },
      { key: 'MEWE_API_KEY', label: 'API key', secret: true },
      { key: 'MEWE_HOST', label: 'API host', optional: true },
    ],
  },
  {
    id: 'whop',
    section: 'channels',
    name: 'Whop',
    description: 'Post to Whop communities.',
    providers: ['whop'],
    callback: true,
    fields: [{ key: 'WHOP_CLIENT_ID', label: 'Client ID' }],
  },
  {
    id: 'dub',
    section: 'links',
    name: 'Dub',
    description: 'Short links with click analytics.',
    docs: 'https://app.dub.co/settings/tokens',
    fields: [{ key: 'DUB_TOKEN', label: 'API key', secret: true }],
  },
  {
    id: 'shortio',
    section: 'links',
    name: 'Short.io',
    description: 'Branded short links.',
    docs: 'https://app.short.io/settings/integrations/api-key',
    fields: [{ key: 'SHORT_IO_SECRET_KEY', label: 'Secret key', secret: true }],
  },
  {
    id: 'kutt',
    section: 'links',
    name: 'Kutt',
    description: 'Open-source short links.',
    docs: 'https://kutt.it',
    fields: [{ key: 'KUTT_API_KEY', label: 'API key', secret: true }],
  },
  {
    id: 'linkdrip',
    section: 'links',
    name: 'LinkDrip',
    description: 'Short links with analytics.',
    docs: 'https://linkdrip.com',
    fields: [{ key: 'LINK_DRIP_API_KEY', label: 'API key', secret: true }],
  },
];

export const platformSettingsKeys = platformSettingsList.flatMap((group) =>
  group.fields.map((field) => field.key)
);
