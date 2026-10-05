import { Metadata } from 'next';
import { LegalPage } from '@gitroom/frontend/components/legal/legal.page';

export const metadata: Metadata = {
  title: 'Castora Privacy Policy',
  description: 'What data Castora collects and how it is used.',
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="October 6, 2026">
      <section>
        <h2>What Castora collects</h2>
        <ul>
          <li>Account details: your name, email address and an encrypted password.</li>
          <li>Connected social accounts: their name, picture and the access tokens the platform gives Castora when you connect them.</li>
          <li>Your content: posts, media, schedules, comments and settings you create.</li>
          <li>Technical data: IP address and browser details, used to keep your account secure.</li>
        </ul>
      </section>
      <section>
        <h2>How it is used</h2>
        <p>
          Only to run Castora: signing you in, publishing posts to the channels
          you choose, showing analytics and keeping the service secure. Castora
          shows no ads and does not sell your data.
        </p>
      </section>
      <section>
        <h2>Who it is shared with</h2>
        <ul>
          <li>The social platforms you publish to receive the content you send them.</li>
          <li>When you use AI features, your prompts and the content they need are sent to the AI provider configured for this workspace, such as Google Gemini or OpenAI.</li>
          <li>The hosting provider stores Castora’s database and media files.</li>
        </ul>
      </section>
      <section>
        <h2>Storage and security</h2>
        <p>
          Data is stored in Castora’s database. Passwords are hashed, and the
          keys used to reach other platforms are encrypted. Only the workspace
          administrators can manage the service.
        </p>
      </section>
      <section>
        <h2>Cookies</h2>
        <p>
          Castora uses cookies to keep you signed in and to remember
          preferences such as your language.
        </p>
      </section>
      <section id="delete-data">
        <h2>Deleting your data</h2>
        <ul>
          <li>Disconnect a channel in Castora to delete its access tokens.</li>
          <li>Delete a post or media file to remove it from Castora. Posts already published stay on the platform until you delete them there.</li>
          <li>Delete your account in Settings to remove your account and its data from Castora.</li>
          <li>You can also ask the workspace administrator to delete your data.</li>
        </ul>
      </section>
      <section>
        <h2>Your rights</h2>
        <p>
          You can ask to see, correct or delete the personal data Castora holds
          about you by contacting the administrator of your Castora workspace.
        </p>
      </section>
      <section>
        <h2>Changes</h2>
        <p>
          This policy can be updated; the date at the top shows the latest
          version.
        </p>
      </section>
    </LegalPage>
  );
}
