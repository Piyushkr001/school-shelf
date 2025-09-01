import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Privacy Policy • SchoolShelf",
  description:
    "Learn how SchoolApp collects, uses, and protects your information.",
}

export default function PrivacyPolicyPage() {
  const updated = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[radial-gradient(1200px_600px_at_12%_-10%,hsl(var(--primary)/0.08),transparent),radial-gradient(900px_500px_at_100%_0%,hsl(var(--muted-foreground)/0.08),transparent)]">
      <section className="container mx-auto px-4 py-10">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Last updated: {updated}
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>

        <Card className="mx-auto max-w-4xl border-0 bg-background/70 shadow-xl ring-1 ring-black/5 backdrop-blur">
          <CardHeader className="border-b bg-gradient-to-r from-primary/10 via-transparent to-transparent">
            <CardTitle className="text-xl">Our commitment to your privacy</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <p>
              This Privacy Policy explains how <strong>SchoolApp</strong> (“we,”
              “our,” or “us”) collects, uses, discloses, and protects your
              information when you use our website and services (collectively,
              the “Service”). By accessing or using the Service, you agree to
              this Privacy Policy. If you do not agree, please discontinue use.
            </p>

            <h2 id="information-we-collect">1. Information we collect</h2>
            <ul>
              <li>
                <strong>Account & Profile Data:</strong> name, email, and any
                info you choose to add to your profile.
              </li>
              <li>
                <strong>Content You Provide:</strong> school details (e.g., name,
                address, city/state), uploaded images, and related metadata.
              </li>
              <li>
                <strong>Usage Data:</strong> device information, pages viewed,
                IP address, browser type, and referral URLs collected via logs
                and similar technologies (e.g., cookies).
              </li>
              <li>
                <strong>Third-Party Auth Data (optional):</strong> if you sign in
                via an identity provider, we receive basic account info as
                permitted by that provider.
              </li>
            </ul>

            <h2 id="how-we-use">2. How we use your information</h2>
            <ul>
              <li>Provide, operate, and maintain the Service.</li>
              <li>Process submissions (e.g., adding schools, uploading images).</li>
              <li>Improve performance, usability, and security.</li>
              <li>Communicate with you about updates, support, and changes.</li>
              <li>Comply with legal obligations and enforce our terms.</li>
            </ul>

            <h2 id="legal-basis">3. Legal bases (EEA/UK users)</h2>
            <p>
              If you are in the EEA/UK, we process your data under one or more of:
              (a) contract performance, (b) legitimate interests (e.g., improving
              our Service), (c) consent (where required), and/or (d) legal
              obligations.
            </p>

            <h2 id="sharing">4. Sharing & disclosure</h2>
            <ul>
              <li>
                <strong>Service Providers:</strong> infrastructure, analytics,
                storage, and security vendors who process data on our behalf.
              </li>
              <li>
                <strong>Legal & Safety:</strong> to comply with law, respond to
                lawful requests, or protect rights, property, and safety.
              </li>
              <li>
                <strong>Business Transfers:</strong> in a merger, acquisition, or
                asset sale, your data may be transferred subject to this Policy.
              </li>
            </ul>

            <h2 id="retention">5. Data retention</h2>
            <p>
              We retain personal data only as long as necessary for the purposes
              set out in this Policy, unless a longer period is required or
              permitted by law (e.g., tax, accounting, audit).
            </p>

            <h2 id="security">6. Security</h2>
            <p>
              We use reasonable technical and organizational measures to protect
              your information. However, no method of transmission or storage is
              100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 id="your-rights">7. Your rights & choices</h2>
            <ul>
              <li>
                <strong>Access, correction, deletion:</strong> request a copy, fix
                inaccuracies, or ask us to delete data, subject to legal limits.
              </li>
              <li>
                <strong>Consent withdrawal:</strong> where processing is based on
                consent, you may withdraw it at any time.
              </li>
              <li>
                <strong>Objection & restriction:</strong> you may object to or
                request restriction of certain processing in some regions.
              </li>
              <li>
                <strong>Appeals/complaints:</strong> you can contact a data
                protection authority if applicable to your jurisdiction.
              </li>
            </ul>

            <h2 id="children">8. Children’s privacy</h2>
            <p>
              The Service is not directed to children under 13 (or the age of
              consent in your region). We do not knowingly collect personal data
              from children. If you believe a child has provided data, contact us
              to request deletion.
            </p>

            <h2 id="international">9. International transfers</h2>
            <p>
              Your data may be processed in countries other than your own. Where
              required, we implement appropriate safeguards (e.g., standard
              contractual clauses) to protect your information.
            </p>

            <h2 id="cookies">10. Cookies & tracking</h2>
            <p>
              We use cookies and similar technologies to operate and improve the
              Service (e.g., essential functionality, analytics). You can control
              cookies via your browser settings. Disabling certain cookies may
              affect functionality.
            </p>

            <h2 id="do-not-track">11. Do Not Track</h2>
            <p>
              Some browsers offer “Do Not Track” signals. Because there is no
              consistent industry standard, we do not currently respond to DNT
              signals.
            </p>

            <h2 id="changes">12. Changes to this Policy</h2>
            <p>
              We may update this Policy from time to time. If we make material
              changes, we will take reasonable steps to notify you (e.g., via the
              site or email). Continued use of the Service after changes means you
              accept the updated Policy.
            </p>

            <h2 id="contact">13. Contact us</h2>
            <p>
              Questions or requests? Email us at{" "}
              <a className="underline" href="mailto:support@schoolapp.local">
                support@schoolapp.local
              </a>
              .
            </p>

            <hr />

            <p className="text-xs text-muted-foreground">
              <strong>Note:</strong> This page provides general information and
              does not constitute legal advice. Please review with counsel to
              ensure compliance with your specific obligations (e.g., GDPR, CCPA).
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
