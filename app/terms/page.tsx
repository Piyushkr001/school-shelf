// app/terms/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Terms of Service • SchoolShelf",
  description:
    "Read the Terms of Service that govern your use of SchoolApp.",
}

const sections = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "eligibility", title: "2. Eligibility & Accounts" },
  { id: "use", title: "3. Permitted Use & User Responsibilities" },
  { id: "content", title: "4. Your Content & Submissions" },
  { id: "ip", title: "5. Intellectual Property" },
  { id: "prohibited", title: "6. Prohibited Activities" },
  { id: "privacy", title: "7. Privacy" },
  { id: "third-parties", title: "8. Third-Party Services & Links" },
  { id: "disclaimer", title: "9. Disclaimers" },
  { id: "liability", title: "10. Limitation of Liability" },
  { id: "indemnity", title: "11. Indemnification" },
  { id: "termination", title: "12. Suspension & Termination" },
  { id: "law", title: "13. Governing Law & Venue" },
  { id: "changes", title: "14. Changes to these Terms" },
  { id: "contact", title: "15. Contact" },
]

export default function TermsPage() {
  const updated = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[radial-gradient(1200px_600px_at_12%_-10%,hsl(var(--primary)/0.08),transparent),radial-gradient(900px_500px_at_100%_0%,hsl(var(--muted-foreground)/0.08),transparent)]">
      <section className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Terms of Service
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Last updated: {updated}
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
            <Button asChild>
              <Link href="/privacy">Privacy Policy</Link>
            </Button>
          </div>
        </div>

        {/* TOC */}
        <Card className="mx-auto mb-6 max-w-4xl border-0 bg-background/70 shadow-xl ring-1 ring-black/5 backdrop-blur">
          <CardHeader className="border-b bg-gradient-to-r from-primary/10 via-transparent to-transparent">
            <CardTitle className="text-base">Quick Navigation</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 p-4 sm:grid-cols-2">
            {sections.map((s) => (
              <Link
                key={s.id}
                href={`#${s.id}`}
                className="text-sm text-primary underline-offset-4 hover:underline"
              >
                {s.title}
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Terms Body */}
        <Card className="mx-auto max-w-4xl border-0 bg-background/70 shadow-xl ring-1 ring-black/5 backdrop-blur">
          <CardHeader className="border-b bg-gradient-to-r from-primary/10 via-transparent to-transparent">
            <CardTitle className="text-xl">
              Please read these Terms carefully
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <p>
              These Terms of Service (“<strong>Terms</strong>”) govern your use of
              <strong> SchoolApp</strong> and any related websites, applications,
              and services (collectively, the “<strong>Service</strong>”). By
              accessing or using the Service, you agree to be bound by these
              Terms. If you do not agree, you must not use the Service.
            </p>

            <h2 id="acceptance">1. Acceptance of Terms</h2>
            <p>
              Your access to and use of the Service is conditioned upon your acceptance
              of and compliance with these Terms and all applicable policies (including
              our <Link href="/privacy" className="underline">Privacy Policy</Link>).
              These Terms apply to all visitors, users, and others who access or use the Service.
            </p>

            <h2 id="eligibility">2. Eligibility & Accounts</h2>
            <ul>
              <li>You must be legally capable of entering into a binding contract in your jurisdiction.</li>
              <li>
                If you create an account, you are responsible for safeguarding your credentials and for all activity
                under your account.
              </li>
              <li>
                You agree to provide accurate, complete, and current information and to update it as needed.
              </li>
            </ul>

            <h2 id="use">3. Permitted Use & User Responsibilities</h2>
            <ul>
              <li>Use the Service only for lawful purposes and in accordance with these Terms.</li>
              <li>
                You are responsible for the content you submit (e.g., school details, images) and for ensuring you have
                necessary rights to that content.
              </li>
              <li>
                You must not interfere with the proper operation of the Service (e.g., by attempting to bypass security or limits).
              </li>
            </ul>

            <h2 id="content">4. Your Content & Submissions</h2>
            <p>
              You retain any ownership rights you have in content you submit to the Service. By submitting content, you
              grant us a worldwide, non-exclusive, royalty-free license to host, store, process, display, and distribute
              that content for the purpose of operating and improving the Service.
            </p>
            <p>
              You are responsible for ensuring your content does not violate laws, third-party rights, or these Terms.
              We may remove or disable access to content that we reasonably believe violates these Terms.
            </p>

            <h2 id="ip">5. Intellectual Property</h2>
            <p>
              The Service, including its design, text, graphics, and software, is owned by us or our licensors and is
              protected by intellectual property laws. Except as expressly permitted, you may not copy, modify, distribute,
              sell, or lease any part of the Service.
            </p>

            <h2 id="prohibited">6. Prohibited Activities</h2>
            <ul>
              <li>Uploading unlawful, infringing, obscene, or fraudulent content.</li>
              <li>Reverse engineering or attempting to derive source code where not permitted by law.</li>
              <li>Accessing or scraping the Service in bulk or using automated means without consent.</li>
              <li>Interfering with security features or imposing unreasonable load on our infrastructure.</li>
            </ul>

            <h2 id="privacy">7. Privacy</h2>
            <p>
              Your use of the Service is subject to our{" "}
              <Link href="/privacy" className="underline">Privacy Policy</Link>, which explains how we collect, use, and
              share information about you.
            </p>

            <h2 id="third-parties">8. Third-Party Services & Links</h2>
            <p>
              The Service may contain links to third-party websites or services that are not owned or controlled by us.
              We are not responsible for the content, policies, or practices of any third-party sites or services.
            </p>

            <h2 id="disclaimer">9. Disclaimers</h2>
            <p>
              THE SERVICE IS PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE
              DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
              PARTICULAR PURPOSE, AND NON-INFRINGEMENT. We do not warrant that the Service will be uninterrupted, secure,
              or error-free.
            </p>

            <h2 id="liability">10. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WILL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR
              INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR
              USE OF (OR INABILITY TO ACCESS OR USE) THE SERVICE.
            </p>

            <h2 id="indemnity">11. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless us and our affiliates, officers, directors, employees, and
              agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable
              attorneys’ fees) arising out of or in any way connected with your use of the Service or violation of these Terms.
            </p>

            <h2 id="termination">12. Suspension & Termination</h2>
            <p>
              We may suspend or terminate your access to the Service at any time, with or without notice, if we reasonably
              believe you have violated these Terms or if necessary to protect the Service or other users.
            </p>

            <h2 id="law">13. Governing Law & Venue</h2>
            <p>
              These Terms are governed by the laws of your organization’s operating jurisdiction (without regard to its
              conflict of laws rules). You agree to the exclusive jurisdiction and venue of courts located in that
              jurisdiction for any dispute arising out of these Terms or the Service.
            </p>

            <h2 id="changes">14. Changes to these Terms</h2>
            <p>
              We may update these Terms from time to time. If we make material changes, we will provide reasonable notice
              (e.g., via the Service or email). Your continued use of the Service after the effective date of the updated
              Terms constitutes your acceptance.
            </p>

            <h2 id="contact">15. Contact</h2>
            <p>
              Questions about these Terms? Contact us at{" "}
              <a className="underline" href="mailto:support@schoolapp.local">support@schoolapp.local</a>.
            </p>

            <hr />

            <p className="text-xs text-muted-foreground">
              <strong>Note:</strong> This template is for general informational purposes only and does not constitute legal
              advice. Please consult legal counsel to tailor these Terms to your needs, including governing law,
              jurisdiction, and specific product policies.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
