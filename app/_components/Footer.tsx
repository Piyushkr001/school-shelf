// components/Footer.tsx
import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur">
      <div className="container mx-auto px-4 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Branding */}
        <div>
          <Image src={"Images/Logo/logo.svg"} alt="logo" width={200} height={200}/>
          <p className="mt-2 text-sm text-muted-foreground">
            A modern platform to add, manage, and explore schools with ease.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col space-y-2">
          <h4 className="text-sm font-semibold">Quick Links</h4>
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
            Home
          </Link>
          <Link href="/addSchool" className="text-sm text-muted-foreground hover:text-primary">
            Add School
          </Link>
          <Link href="/showSchools" className="text-sm text-muted-foreground hover:text-primary">
            Browse Schools
          </Link>
        </div>

        {/* Contact / Extras */}
        <div className="flex flex-col space-y-2">
          <h4 className="text-sm font-semibold">Resources</h4>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="/help" className="text-sm text-muted-foreground hover:text-primary">
            Help Center
          </Link>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SchoolApp · All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-primary">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-primary">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
