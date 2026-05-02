import type { Metadata } from "next";
import Link from "next/link"
import { SiteNav, SiteFooter } from "../../components/SiteLayout";

export const metadata: Metadata = {
  title: "Terms of Use - Urli",
  description:
    "Terms and conditions for using Urli URL shortener. Governing law: India.",
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "May 2, 2025";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-10">
      <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
        {title}
      </h2>
      <div className="space-y-3 text-gray-600 leading-relaxed">{children}</div>
    </section>
  );
}

const TOC = [
  ["#acceptance", "Acceptance of Terms"],
  ["#service", "Description of Service"],
  ["#accounts", "Accounts & Registration"],
  ["#plans", "Plans, Payments & Billing"],
  ["#trial", "Free Trial"],
  ["#acceptable-use", "Acceptable Use Policy"],
  ["#prohibited", "Prohibited Content & Uses"],
  ["#ip", "Intellectual Property"],
  ["#termination", "Termination"],
  ["#disclaimers", "Disclaimers"],
  ["#liability", "Limitation of Liability"],
  ["#indemnity", "Indemnification"],
  ["#governing-law", "Governing Law & Disputes"],
  ["#changes", "Changes to Terms"],
  ["#contact", "Contact"],
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />
      <div className="bg-gray-50 border-b border-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-5">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Terms of Use</h1>
          <p className="text-gray-500 text-sm">The rules for using Urli. Governing law: India.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 flex gap-12">
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Contents
            </div>
            <nav className="space-y-1">
              {TOC.map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="block text-sm text-gray-500 hover:text-blue-600 py-1 hover:translate-x-1 transition-all"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 max-w-3xl">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Terms of Use
            </h1>
            <p className="text-sm text-gray-400">
              Last updated: {LAST_UPDATED} · Effective: {LAST_UPDATED}
            </p>
            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100 text-sm text-amber-800">
              Please read these Terms carefully before using Urli. By creating
              an account or using our service, you agree to be bound by these
              Terms. If you do not agree, do not use Urli.
            </div>
          </div>

          <Section id="acceptance" title="1. Acceptance of Terms">
            <p>
              These Terms of Use ("Terms") constitute a legally binding
              agreement between you ("User", "you") and{" "}
              <strong>IdeaSprout Technologies</strong>, the operator of Urli
              ("we", "us", "our") at{" "}
              <a
                href="https://ideasprout.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                ideasprout.in
              </a>
              .
            </p>
            <p>
              By registering for an account, clicking "Create account", or
              otherwise using the Urli service, you confirm that you have read,
              understood, and agree to these Terms and our{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            <p>
              You must be at least 13 years old to use Urli. By using the
              service, you represent that you meet this requirement.
            </p>
          </Section>

          <Section id="service" title="2. Description of Service">
            <p>
              Urli provides a URL shortening and link management platform
              including:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>URL shortening and custom slug creation</li>
              <li>Click analytics (country, device, referrer, time-series)</li>
              <li>QR code generation</li>
              <li>UTM parameter templates</li>
              <li>Retargeting pixel injection (Facebook, Google)</li>
              <li>Link-in-bio pages</li>
              <li>Custom domains (Pro/Business)</li>
              <li>Team workspaces (Business)</li>
              <li>REST API access (Pro/Business)</li>
              <li>Browser extensions (Chrome, Etsy, Canva, Shopify)</li>
            </ul>
            <p>
              We reserve the right to modify, suspend, or discontinue any
              feature at any time with reasonable notice.
            </p>
          </Section>

          <Section id="accounts" title="3. Accounts & Registration">
            <p>
              You must provide accurate, current, and complete information when
              registering. You are responsible for maintaining the
              confidentiality of your account credentials and for all activity
              under your account.
            </p>
            <p>
              You must notify us immediately at support@ideasprout.in if you
              suspect unauthorised access to your account.
            </p>
            <p>
              One person or legal entity may not maintain more than one free
              account. Multiple accounts to circumvent plan limits are
              prohibited.
            </p>
          </Section>

          <Section id="plans" title="4. Plans, Payments & Billing">
            <p>
              <strong>Pricing:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Starter (Free):</strong> 50 links/month, 30-day
                analytics, static QR codes
              </li>
              <li>
                <strong>Pro (₹15/month):</strong> Unlimited links, 1 custom
                domain, forever analytics, expiry, UTM, pixels, dynamic QR, API,
                bio page
              </li>
              <li>
                <strong>Business (₹49/month):</strong> Everything in Pro + 5
                seats, 3 domains, smart redirects, workspaces, white-label QR,
                Zapier
              </li>
            </ul>
            <p className="mt-3">
              All prices are in Indian Rupees (INR) and are inclusive of
              applicable taxes. Payments are processed by{" "}
              <strong>Razorpay</strong>. By subscribing, you also agree to{" "}
              <a
                href="https://razorpay.com/terms/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Razorpay's Terms of Service
              </a>
              .
            </p>
            <p>
              Subscriptions are billed monthly on the date you subscribed. You
              authorise us to charge your payment method on a recurring basis
              until you cancel.
            </p>
            <p>
              See our{" "}
              <Link href="/refund" className="text-blue-600 hover:underline">
                Refund Policy
              </Link>{" "}
              for cancellation and refund terms.
            </p>
          </Section>

          <Section id="trial" title="5. Free Trial">
            <p>
              New Pro and Business subscribers receive a{" "}
              <strong>30-day free trial</strong>. No credit card is required to
              start the trial.
            </p>
            <p>
              At the end of the trial period, your account will revert to the
              Free plan unless you provide payment details and activate a paid
              subscription. We will send a reminder email before the trial ends.
            </p>
            <p>
              Free trial abuse (creating multiple accounts to extend trial
              access) is prohibited and may result in account termination.
            </p>
          </Section>

          <Section id="acceptable-use" title="6. Acceptable Use Policy">
            <p>
              You agree to use Urli only for lawful purposes and in accordance
              with these Terms. You are solely responsible for all content and
              URLs you shorten or share using Urli.
            </p>
            <p>You agree not to use Urli in any way that:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Violates any applicable Indian or international law or
                regulation
              </li>
              <li>
                Infringes the intellectual property rights of any third party
              </li>
              <li>
                Transmits unsolicited bulk email (spam) or uses Urli links in
                spam campaigns
              </li>
              <li>
                Attempts to gain unauthorised access to our systems or other
                users' accounts
              </li>
              <li>
                Interferes with or disrupts the integrity or performance of the
                service
              </li>
              <li>Circumvents plan limits through technical means</li>
            </ul>
          </Section>

          <Section id="prohibited" title="7. Prohibited Content & Uses">
            <p>
              You may not use Urli to shorten, share, or redirect to URLs
              containing or promoting:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Malware, viruses, phishing pages, or other malicious content
              </li>
              <li>
                Child sexual abuse material (CSAM) - zero tolerance, reported to
                authorities
              </li>
              <li>
                Content that is illegal under the Information Technology Act,
                2000 or Indian Penal Code
              </li>
              <li>
                Hate speech, incitement to violence, or content targeting
                protected groups
              </li>
              <li>Counterfeit goods, illegal drugs, or weapons</li>
              <li>Deceptive or fraudulent content</li>
              <li>
                Content that violates Google's policies (required for Google
                OAuth compliance)
              </li>
            </ul>
            <p>
              We reserve the right to remove any link and suspend any account
              that violates this policy, without notice and without refund.
            </p>
          </Section>

          <Section id="ip" title="8. Intellectual Property">
            <p>
              <strong>Our IP:</strong> Urli, its logo, software, design, and
              content are owned by us and protected by copyright and trademark
              law. You may not copy, modify, distribute, or create derivative
              works without our written permission.
            </p>
            <p>
              <strong>Your content:</strong> You retain ownership of the URLs
              and content you submit. By using Urli, you grant us a limited,
              non-exclusive licence to process and display your links and
              analytics data solely to provide the service.
            </p>
            <p>
              <strong>Feedback:</strong> Any feedback or suggestions you provide
              may be used by us without obligation to you.
            </p>
          </Section>

          <Section id="termination" title="9. Termination">
            <p>
              <strong>By you:</strong> You may delete your account at any time
              via Dashboard → Settings → Delete Account or by emailing
              support@ideasprout.in. Deletion is subject to our{" "}
              <Link
                href="/account-deletion"
                className="text-blue-600 hover:underline"
              >
                Account Deletion Policy
              </Link>
              .
            </p>
            <p>
              <strong>By us:</strong> We may suspend or terminate your account
              immediately if you violate these Terms, engage in fraudulent
              activity, or if required by law. We will provide notice where
              reasonably practicable.
            </p>
            <p>
              Upon termination, your right to use the service ceases
              immediately. Provisions that by their nature should survive
              termination (IP, disclaimers, liability, governing law) will
              survive.
            </p>
          </Section>

          <Section id="disclaimers" title="10. Disclaimers">
            <p>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
              WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
              LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
              PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p>
              We do not warrant that the service will be uninterrupted,
              error-free, or free of viruses. We are not responsible for the
              content of URLs shortened by users.
            </p>
          </Section>

          <Section id="liability" title="11. Limitation of Liability">
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, URLI SHALL NOT
              BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
              PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL,
              ARISING FROM YOUR USE OF THE SERVICE.
            </p>
            <p>
              OUR TOTAL LIABILITY TO YOU FOR ANY CLAIM ARISING FROM THESE TERMS
              OR YOUR USE OF THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID TO
              US IN THE 12 MONTHS PRECEDING THE CLAIM, OR ₹1,000, WHICHEVER IS
              GREATER.
            </p>
          </Section>

          <Section id="indemnity" title="12. Indemnification">
            <p>
              You agree to indemnify, defend, and hold harmless Urli and its
              officers, directors, employees, and agents from any claims,
              damages, losses, liabilities, and expenses (including legal fees)
              arising from: (a) your use of the service; (b) your violation of
              these Terms; (c) your violation of any third-party rights; or (d)
              any content or URLs you submit through the service.
            </p>
          </Section>

          <Section id="governing-law" title="13. Governing Law & Disputes">
            <p>
              These Terms are governed by and construed in accordance with the
              laws of <strong>India</strong>, without regard to conflict of law
              principles.
            </p>
            <p>
              Any dispute arising from these Terms shall first be attempted to
              be resolved through good-faith negotiation. If unresolved within
              30 days, disputes shall be subject to the exclusive jurisdiction
              of the courts of <strong>Mumbai, Maharashtra, India</strong>.
            </p>
            <p>
              For consumer disputes, you may also approach the Consumer Disputes
              Redressal Forum under the Consumer Protection Act, 2019.
            </p>
          </Section>

          <Section id="changes" title="14. Changes to Terms">
            <p>
              We may update these Terms from time to time. We will notify you of
              material changes by email and by updating the "Last updated" date.
              Continued use of Urli after changes constitutes acceptance of the
              updated Terms.
            </p>
            <p>
              If you do not agree to the updated Terms, you must stop using the
              service and may delete your account.
            </p>
          </Section>

          <Section id="contact" title="15. Contact">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm space-y-1">
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:support@ideasprout.in"
                  className="text-blue-600 hover:underline"
                >
                  support@ideasprout.in
                </a>
              </p>
              <p>
                <strong>Grievance Officer (IT Act 2000):</strong>{" "}
                support@ideasprout.in
              </p>
              <p>
                <strong>Response time:</strong> Within 30 days
              </p>
            </div>
          </Section>
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
