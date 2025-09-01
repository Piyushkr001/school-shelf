import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, MapPin, UploadCloud, Database, LayoutGrid, ShieldCheck } from "lucide-react"

export default function Hero() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      {/* Hero */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 lg:flex-row lg:items-center">
          {/* Left: copy */}
          <div className="flex w-full flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Built with Next.js + MySQL + Shadcn UI
            </span>

            <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
              Discover & Manage <span className="text-primary">Schools</span> Effortlessly
            </h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Add school details with validation, store images securely, and browse schools in a clean,
              product-style grid. Fully responsive—works great on mobile and desktop.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/addSchool">Add a School</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/showSchools">Browse Schools</Link>
              </Button>
            </div>
          </div>

          {/* Right: hero image */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border">
              <Image
                src="/Images/Hero_Illustration.png"
                alt="Manage schools easily with a modern dashboard"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-8 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Why this project?</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Everything you need to complete the assignment with best practices:
            validation, image uploads, and a catalog-like listing page.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UploadCloud className="h-5 w-5 text-primary" aria-hidden="true" />
                Image Uploads
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Store school images in <code>schoolImages/</code> and save the path in MySQL.
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" aria-hidden="true" />
                MySQL Schema
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Uses a <code>schools</code> table with fields like name, address, city, state, contact, email, and image.
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" aria-hidden="true" />
                Validated Forms
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Built with <strong>react-hook-form</strong>; email/contact are validated before insert.
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutGrid className="h-5 w-5 text-primary" aria-hidden="true" />
                Product-Style Listing
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Show schools as cards (image, name, address, city) in a responsive grid—like an e-commerce catalog.
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                Responsive by Default
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Flex/grid layouts adapt smoothly from small screens to large desktops.
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
                Clean & Modern UI
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Shadcn UI components + Tailwind for a polished, accessible interface.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA strip */}
      <section className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row">
          <div>
            <h3 className="text-xl font-semibold">Ready to get started?</h3>
            <p className="text-sm text-muted-foreground">
              Add a school now, or explore the catalog of saved schools.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/addSchool">Add School</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/showSchools">View Schools</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
