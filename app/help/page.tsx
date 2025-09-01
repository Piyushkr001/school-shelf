"use client"
import * as React from "react"
import Link from "next/link"
import {
  LifeBuoy,
  Search,
  Mail,
  BookOpen,
  Shield,
  FileQuestion,
  Cog,
  ArrowRight,
  ExternalLink,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


type FAQ = {
  q: string
  a: React.ReactNode
  tags?: string[]
  id: string
}

const FAQS: FAQ[] = [
  {
    id: "create-school",
    q: "How do I add a new school?",
    tags: ["schools", "create", "images"],
    a: (
      <>
        Go to <Link href="/addSchool" className="underline">Add School</Link>, fill in the
        required fields (name, address, city, state, contact, email), and upload an image
        (PNG/JPG/WEBP up to 5MB). Click <strong>Save School</strong>. It will appear on{" "}
        <Link href="/showSchools" className="underline">Browse Schools</Link> instantly.
      </>
    ),
  },
  {
    id: "image-issues",
    q: "My image won’t upload. What can I do?",
    tags: ["images", "upload"],
    a: (
      <>
        Ensure the file is PNG, JPG/JPEG, or WEBP and less than 5MB. If it still fails,
        try a different browser, rename the file (letters/numbers only), and retry.
      </>
    ),
  },
  {
    id: "find-school",
    q: "How do I search schools by city or address?",
    tags: ["search"],
    a: (
      <>
        Use the search bar on <Link href="/showSchools" className="underline">Browse Schools</Link>.
        You can search by <em>name</em>, <em>city</em>, or <em>address</em>. Results are paginated.
      </>
    ),
  },
  {
    id: "privacy",
    q: "Where can I read your Privacy Policy?",
    tags: ["privacy", "policy", "legal"],
    a: (
      <>
        Check out our <Link href="/privacy" className="underline">Privacy Policy</Link> to learn how
        we collect, use, and protect your information.
      </>
    ),
  },
  {
    id: "account",
    q: "How do I sign up or log in?",
    tags: ["account", "auth"],
    a: (
      <>
        Use the buttons in the navbar. If you’re already signed in, you’ll see your
        account menu instead of the Sign Up button.
      </>
    ),
  },
]

const CATEGORIES = [
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Getting Started",
    desc: "Create schools, upload images, and browse the catalog.",
    href: "/addSchool",
  },
  {
    icon: <FileQuestion className="h-5 w-5" />,
    title: "Using the Catalog",
    desc: "Search & filter schools and explore details.",
    href: "/showSchools",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Privacy & Security",
    desc: "Understand how we handle your data.",
    href: "/privacy",
  },
  {
    icon: <Cog className="h-5 w-5" />,
    title: "Troubleshooting",
    desc: "Fix common issues with uploads and forms.",
    href: "#faqs",
  },
]

export default function HelpCenterPage() {
  const [query, setQuery] = React.useState("")

  const filtered = React.useMemo(() => {
    if (!query.trim()) return FAQS
    const q = query.toLowerCase()
    return FAQS.filter(
      (f) =>
        f.q.toLowerCase().includes(q) ||
        (typeof f.a === "string" && f.a.toLowerCase().includes(q)) ||
        f.tags?.some((t) => t.toLowerCase().includes(q))
    )
  }, [query])

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[radial-gradient(1200px_600px_at_12%_-10%,hsl(var(--primary)/0.08),transparent),radial-gradient(900px_500px_at_100%_0%,hsl(var(--muted-foreground)/0.08),transparent)]">
      <section className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10">
              <LifeBuoy className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Help Center</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Guides, FAQs, and ways to get in touch.
              </p>
            </div>
          </div>

          <Button asChild variant="outline" className="gap-2">
            <Link href="/">
              Back to Home
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Search Bar */}
        <Card className="mb-8 border-0 bg-background/70 shadow-xl ring-1 ring-black/5 backdrop-blur">
          <CardContent className="p-5">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                // Optionally route to a dedicated search page:
                // router.push(`/help?q=${encodeURIComponent(query)}`)
              }}
              className="flex items-center gap-3 rounded-xl border bg-muted/40 p-2 pl-3"
            >
              <Search className="h-4 w-4 opacity-70" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search help topics, e.g. “upload image”"
                className="border-none bg-transparent focus-visible:ring-0"
              />
              <Button type="submit" className="rounded-lg px-5">Search</Button>
            </form>
            {query && (
              <p className="mt-2 text-xs text-muted-foreground">
                Showing {filtered.length} result{filtered.length === 1 ? "" : "s"} for “{query}”
              </p>
            )}
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Card
              key={c.title}
              className="group border-0 bg-background/70 shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
            >
              <CardContent className="p-5">
                <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2 text-primary">
                  {c.icon}
                </div>
                <h3 className="text-base font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                <Button asChild variant="link" className="mt-1 px-0 text-primary">
                  <Link href={c.href}>
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>


        {/* FAQs */}
        <div id="faqs" className="mb-10">
          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
            <Badge variant="secondary">{FAQS.length}</Badge>
          </div>

          <Card className="border-0 bg-background/70 shadow-sm ring-1 ring-black/5">
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="divide-y">
                {filtered.map((f) => (
                  <AccordionItem key={f.id} value={f.id} className="px-4">
                    <AccordionTrigger className="py-4 text-left text-base font-medium">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-sm text-muted-foreground">
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        {f.a}
                      </div>
                      {f.tags && f.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {f.tags.map((t) => (
                            <Badge key={t} variant="outline" className="text-[10px]">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
                {filtered.length === 0 && (
                  <div className="p-6 text-sm text-muted-foreground">
                    No results. Try different keywords or browse the categories above.
                  </div>
                )}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Contact options */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-0 bg-background/70 shadow-sm ring-1 ring-black/5">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Mail className="h-4 w-4" /> Email Support
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Send us details and screenshots if possible.
              <div className="mt-3">
                <Button asChild size="sm">
                  <a href="mailto:support@schoolapp.local">support@schoolapp.local</a>
                </Button>
              </div>
            </CardContent>
          </Card>


          <Card className="border-0 bg-background/70 shadow-sm ring-1 ring-black/5">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <BookOpen className="h-4 w-4" /> Guides & Docs
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Step-by-step tutorials and best practices.
              <div className="mt-3">
                <Button asChild size="sm" variant="link" className="px-0">
                  <Link href="#">
                    Browse docs <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer tiny note */}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Can’t find what you need?{" "}
          <Link href="/contact" className="underline">Contact support</Link>.
        </p>
      </section>
    </main>
  )
}
