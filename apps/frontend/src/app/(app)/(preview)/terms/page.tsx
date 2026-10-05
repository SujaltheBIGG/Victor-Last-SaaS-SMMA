import { Metadata } from 'next';
import { LegalPage } from '@gitroom/frontend/components/legal/legal.page';

export const metadata: Metadata = {
  title: 'Castora Terms of Service',
  description: 'The terms for using Castora.',
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="October 6, 2026">
      <section>
        <h2>About Castora</h2>
        <p>
          Castora is a social media scheduling tool. These terms apply to
          everyone who signs in to this Castora workspace. By creating an
          account you agree to them.
        </p>
      </section>
      <section>
        <h2>Your account</h2>
        <ul>
          <li>Keep your login details private. You are responsible for what happens under your account.</li>
          <li>Only connect social accounts you own or are allowed to publish for.</li>
          <li>The workspace administrator can invite, suspend or remove users.</li>
        </ul>
      </section>
      <section>
        <h2>Acceptable use</h2>
        <ul>
          <li>Follow the rules of every platform you publish to, such as Meta, LinkedIn, YouTube and Telegram.</li>
          <li>Do not use Castora for spam, harassment, malware or anything illegal.</li>
          <li>Do not try to access other users’ data or interfere with the service.</li>
        </ul>
      </section>
      <section>
        <h2>Your content</h2>
        <p>
          You keep ownership of everything you create in Castora. You allow
          Castora to store your content and to publish it to the channels and
          at the times you choose.
        </p>
      </section>
      <section>
        <h2>AI features</h2>
        <p>
          AI suggestions can be inaccurate or incomplete. Review AI generated
          text and media before you publish it.
        </p>
      </section>
      <section>
        <h2>Third-party services</h2>
        <p>
          Publishing, analytics and AI features rely on third-party services.
          Their own terms apply, and Castora cannot guarantee that they stay
          available or unchanged.
        </p>
      </section>
      <section>
        <h2>Availability and liability</h2>
        <p>
          Castora is provided as is, without warranties. It may change, pause or
          stop at any time. To the extent the law allows, Castora is not liable
          for lost content, missed posts or indirect damages.
        </p>
      </section>
      <section>
        <h2>Ending your use</h2>
        <p>
          You can stop using Castora and delete your account at any time from
          Settings. See the <a href="/privacy">Privacy Policy</a> for what
          happens to your data.
        </p>
      </section>
      <section>
        <h2>Open source</h2>
        <p>
          Castora is built on the open-source Postiz project and is distributed
          under the GNU Affero General Public License v3.0.
        </p>
      </section>
      <section>
        <h2>Changes and contact</h2>
        <p>
          These terms can be updated; the date at the top shows the latest
          version. For questions, contact the administrator of your Castora
          workspace.
        </p>
      </section>
    </LegalPage>
  );
}
