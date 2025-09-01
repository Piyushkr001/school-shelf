"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  const toggleMenu = () => setIsOpen((s) => !s)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  React.useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full rounded-3xl bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "border-b border-gray-200 dark:border-gray-800",
        scrolled ? "shadow-sm" : "shadow-none",
      ].join(" ")}
      role="navigation"
      aria-label="Primary"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="SchoolApp Home">
          <Image
            src={"/Images/Logo/logo.svg"}
            alt="SchoolApp logo"
            width={150}
            height={150}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link href="/addSchool" className="text-sm font-medium hover:text-primary">
            Add School
          </Link>
          <Link href="/showSchools" className="text-sm font-medium hover:text-primary">
            Schools
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <SignedOut>
            {/* Show Sign Up + Login when signed out */}
            <SignUpButton mode="modal">
              <Button variant="outline" size="sm">Sign Up</Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button size="sm">Login</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            {/* Replace Login with UserButton & hide Sign Up */}
            <UserButton
              appearance={{ elements: { avatarBox: "h-8 w-8" } }}
              userProfileMode="modal"
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>

        {/* Mobile Hamburger */}
        <Button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 outline-none focus:ring-2 focus:ring-primary"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-background/95 backdrop-blur"
        >
          <div className="container mx-auto flex flex-col items-center gap-4 px-4 py-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-sm font-medium hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/addSchool"
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-sm font-medium hover:text-primary"
            >
              Add School
            </Link>
            <Link
              href="/showSchools"
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-sm font-medium hover:text-primary"
            >
              Schools
            </Link>

            {/* Auth actions on mobile */}
            <SignedOut>
              <div className="flex w-full flex-col gap-2 sm:w-56">
                <SignUpButton mode="modal">
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Sign Up
                  </Button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <Button onClick={() => setIsOpen(false)}>Login</Button>
                </SignInButton>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex w-full items-center justify-center">
                <UserButton
                  appearance={{ elements: { avatarBox: "h-8 w-8" } }}
                  userProfileMode="modal"
                  afterSignOutUrl="/"
                />
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  )
}
