/**
 * English translation of the legal pages (content/hr/legal.tsx).
 * The Croatian version is legally binding — the page shows a translation notice (ui.legal.translationNote).
 * Company details come from content/site.ts; placeholders [UPISATI: …] stay until they are filled in.
 */
import Link from "next/link";
import { site } from "../site";
import { href } from "../routes";
import type { LegalText } from "../hr/legal";
import { CookieSettingsButton } from "@/components/privacy/CookieSettingsButton";

const L = site.legal;

export const legal: LegalText = {
  privacy: {
    title: "Privacy Policy",
    description: "How Tavla collects, uses and protects the personal data of website visitors and people who use the contact form.",
    Body: function PrivacyBody() {
      return (
        <>
          <p>
            This policy explains how we process personal data when you visit this website and when you send us an enquiry. Processing
            is based on the General Data Protection Regulation (GDPR, Regulation (EU) 2016/679) and the Croatian Act on the
            Implementation of the General Data Protection Regulation.
          </p>

          <h2>1. Data controller</h2>
          <p>
            <strong>{L.companyName}</strong>, OIB (Croatian personal identification number) {L.oib}, {L.address}, registered with {L.registry}.<br />
            Contact for privacy questions: <strong>{L.privacyEmail}</strong>
          </p>
          <p>[UPISATI: data protection officer, if appointed]</p>

          <h2>2. What data we process and why</h2>
          <table>
            <thead>
              <tr><th>Data</th><th>Purpose</th><th>Legal basis</th><th>Retention</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Full name, venue name, email, phone (optional), venue type, message</td>
                <td>Replying to your enquiry and arranging a demo</td>
                <td>Steps prior to entering into a contract at your request (Art. 6(1)(b) GDPR) and legitimate interest in replying to your enquiry (Art. 6(1)(f))</td>
                <td>[UPISATI: e.g. 12 months from last contact, unless we enter into a contract]</td>
              </tr>
              <tr>
                <td>One-way hash of the IP address</td>
                <td>Protecting the form from abuse and spam (limiting the number of requests)</td>
                <td>Legitimate interest in security (Art. 6(1)(f))</td>
                <td>Up to 10 minutes</td>
              </tr>
              <tr>
                <td>Your cookie choice</td>
                <td>Remembering your cookie decision</td>
                <td>Legal obligation and legitimate interest (Art. 6(1)(c) and (f))</td>
                <td>6 months</td>
              </tr>
              <tr>
                <td>Full name, venue name, venue type and traffic source (e.g. “Google”, UTM campaign — only if you consented to analytics). Email and message are not stored in the database; they reach us by email only.</td>
                <td>Keeping a record of demo requests and measuring which channels bring enquiries</td>
                <td>Legitimate interest (Art. 6(1)(f))</td>
                <td>[UPISATI: e.g. 24 months from the enquiry]</td>
              </tr>
              <tr>
                <td>Aggregate, cookieless visit statistics (Cloudflare Web Analytics): number of visits, source, country, device type, loading speed</td>
                <td>Measuring traffic and the technical quality of the website</td>
                <td>Legitimate interest (Art. 6(1)(f)). No cookies or browser identifiers are used.</td>
                <td>According to Cloudflare&apos;s settings; we only see aggregate data</td>
              </tr>
              <tr>
                <td>
                  Website usage data (only with “Analytics” consent): pages visited, time spent on each section, scroll depth, clicks on
                  buttons (position relative to the section), referring domain, UTM parameters, device type and screen width range, and a
                  random session ID stored only in sessionStorage and deleted when you close the tab. No IP address, no user agent, no
                  cookies, no content you type into forms.
                </td>
                <td>Improving the website: what visitors find useful, where they drop off and how many request a demo</td>
                <td>Consent (Art. 6(1)(a)), which you can withdraw at any time</td>
                <td>Individual events for 13 months, after that only aggregate daily data without the session ID</td>
              </tr>
              <tr id="newsletter">
                <td>Email address, signup source (footer, form, feature page), interest (e.g. AI Tips), consent text version and time of signup, confirmation and unsubscription</td>
                <td>Sending Tavla updates and offers, once a month at most. Signup is confirmed by clicking a link in an email (double opt-in).</td>
                <td>Consent (Art. 6(1)(a)). Withdrawal: the “Unsubscribe” link in every email or an email to {L.privacyEmail}.</td>
                <td>Until you unsubscribe. Unconfirmed signups are deleted after 30 days. After unsubscription we keep only the address and time of unsubscription as proof, [UPISATI: e.g. 3 years].</td>
              </tr>
            </tbody>
          </table>
          <p>We don&apos;t collect more data than necessary, we don&apos;t sell it, and we don&apos;t use it for automated decision-making or profiling.</p>

          <h2>3. Recipients and processors</h2>
          <p>We share data only with service providers who help us run the website, under data processing agreements:</p>
          <ul>
            <li>Cloudflare, Inc. — website hosting (Cloudflare Workers), database for analytics, enquiries and the newsletter (Cloudflare D1), cookieless visit statistics (Cloudflare Web Analytics) and access protection for internal pages; the database is located in Western Europe (EU)</li>
            <li>Resend — sending email (form enquiries, newsletter signup confirmation) and the newsletter recipient list</li>
            <li>[UPISATI: if used — Upstash (request rate limiting), Cloudflare Turnstile (spam protection)]</li>
          </ul>
          <p>
            If data is transferred outside the European Economic Area, the transfer is based on an adequacy decision or the European
            Commission&apos;s standard contractual clauses. [UPISATI: confirm for each processor]
          </p>

          <h2 id="rights">4. Your rights</h2>
          <p>At any time, you can request:</p>
          <ul>
            <li><strong>access</strong> to the data we process about you and a copy of it,</li>
            <li><strong>rectification</strong> of inaccurate or incomplete data,</li>
            <li><strong>erasure</strong> of your data,</li>
            <li><strong>restriction of processing</strong>,</li>
            <li><strong>portability</strong> of your data in a structured, machine-readable format,</li>
            <li><strong>objection</strong> to processing based on legitimate interest,</li>
            <li><strong>withdrawal of consent</strong>, without affecting the lawfulness of processing before withdrawal. You can change your cookie consent via the “Cookie settings” link in the site footer.</li>
          </ul>

          <h2 id="requests">5. How to submit a request</h2>
          <p>
            Send your request to <strong>{L.privacyEmail}</strong>, stating which right it concerns. We will reply without undue
            delay, and within one month at the latest. To protect your data, we may ask you to confirm your identity.
          </p>
          <p>
            If you believe the processing violates the regulations, you have the right to lodge a complaint with the Croatian Personal
            Data Protection Agency (AZOP), Selska cesta 136, 10000 Zagreb, Croatia,{" "}
            <a href="https://azop.hr" rel="noopener noreferrer" target="_blank">azop.hr</a>.
          </p>

          <h2>6. Security</h2>
          <p>
            The website is served exclusively over an encrypted connection (HTTPS). Service access keys are never available in the
            browser, enquiries are validated on the server, and only people who need it to reply to an enquiry have access to the data.
          </p>

          <h2>7. Changes</h2>
          <p>We may update this policy when the way we process data changes. The date of the last update is shown at the top of the page.</p>
        </>
      );
    },
  },

  cookies: {
    title: "Cookie Policy",
    description: "Which cookies the Tavla website uses, why, and how to manage your consent.",
    Body: function CookiesBody() {
      return (
        <>
          <p>
            Cookies are small files a website stores in your browser. We use essential cookies because the website doesn&apos;t work
            properly without them. We use all others only if you explicitly agree, and they are not loaded before that.
          </p>

          <p>
            <CookieSettingsButton className="inline-flex h-11 items-center rounded-full bg-ink px-5 text-[0.9375rem] font-medium text-white" label="Change cookie settings" />
          </p>

          <h2>Cookies we use</h2>
          <table>
            <thead>
              <tr><th>Name</th><th>Category</th><th>Purpose</th><th>Duration</th></tr>
            </thead>
            <tbody>
              <tr><td>tavla_consent</td><td>Essential</td><td>Remembers your cookie choice</td><td>6 months</td></tr>
              <tr>
                <td>cf_* (only if Cloudflare Turnstile is enabled)</td>
                <td>Essential</td>
                <td>Protects the contact form from automated spam</td>
                <td>Session</td>
              </tr>
            </tbody>
          </table>

          <h2>Other browser storage</h2>
          <table>
            <thead>
              <tr><th>Name</th><th>Category</th><th>Purpose</th><th>Duration</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>tavla_sid, tavla_attr (sessionStorage)</td>
                <td>Analytics — only with consent</td>
                <td>Random session ID and visit source (domain, UTM) for our own website usage statistics. Contains no IP address or device data.</td>
                <td>Until the tab is closed</td>
              </tr>
            </tbody>
          </table>

          <h2>Cookieless statistics</h2>
          <p>
            For total visits and loading speed we use <strong>Cloudflare Web Analytics</strong>. It sets no cookies, uses no local
            storage and doesn&apos;t recognize you between visits, so it loads without consent. We only see aggregate data (number of
            visits, source, country, device type).
          </p>
          <p>
            We collect our own usage statistics (which sections are useful, where visitors drop off) <strong>only if you consent to
            analytics cookies</strong>. Individual events are kept for 13 months, after that only aggregate daily data. When you
            withdraw consent, collection stops immediately and the session ID is deleted.
          </p>
          <p>We don&apos;t use marketing cookies at the moment. If we introduce them, this table will be updated and we will ask for new consent.</p>

          <h2>Managing your consent</h2>
          <ul>
            <li>On your first visit, you can accept all, reject optional cookies or choose categories. Nothing optional is pre-selected.</li>
            <li>You can change your decision at any time via the “Cookie settings” link in the footer of every page.</li>
            <li>When you withdraw analytics consent, we remove analytics cookies and the page reloads without them.</li>
            <li>You can also delete cookies in your browser settings.</li>
          </ul>

          <h2>More information</h2>
          <p>How we process personal data is described in our <Link href={href("privacy", "en")}>Privacy Policy</Link>.</p>
        </>
      );
    },
  },

  terms: {
    title: "Terms of Use",
    description: "Terms of use for the Tavla website.",
    Body: function TermsBody() {
      return (
        <>
          <p>
            These terms govern the use of the website {site.url.replace("https://", "")}. By using the website, you accept these terms.
            Use of the Tavla service in a hospitality venue is governed by a separate agreement with the customer.
          </p>

          <h2>1. Provider</h2>
          <p>{L.companyName}, OIB {L.oib}, {L.address}.</p>

          <h2>2. Website content</h2>
          <p>
            The website content is for information only. Descriptions and interface previews are meant to introduce the service.
            Features marked “Coming soon” are in development and not part of the current offer.
          </p>

          <h2>3. Interactive demo</h2>
          <p>
            The demo on the website uses made-up data and runs only in your browser. Demo orders are not sent to any real venue and are
            not stored on our servers.
          </p>

          <h2>4. Intellectual property</h2>
          <p>
            The Tavla name and logo, the website design, texts and interface previews are protected. They may not be copied or used
            without prior written permission.
          </p>

          <h2>5. Acceptable use</h2>
          <ul>
            <li>Sending automated or malicious requests through the contact form is prohibited.</li>
            <li>Attempts to gain unauthorized access to the website, servers or data are prohibited.</li>
          </ul>

          <h2>6. Liability</h2>
          <p>
            We do our best to keep the website available and accurate, but we don&apos;t guarantee uninterrupted operation. [UPISATI:
            limitation of liability in line with regulations, subject to legal review]
          </p>

          <h2>7. Governing law</h2>
          <p>These terms are governed by the laws of the Republic of Croatia. [UPISATI: competent court]</p>

          <h2>8. Contact</h2>
          <p>Send questions about these terms to {L.privacyEmail}.</p>
        </>
      );
    },
  },
};
