"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Building2, Menu, X } from "lucide-react"
import Link from "next/link"

interface AuthUser {
  email: string
  role: string
}

export function Header() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const getDashboardLink = (role: string) => {
    switch (role) {
      case "student":
        return "/dashboard/student"
      case "warden":
        return "/dashboard/warden"
      default:
        return "/"
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-responsive flex h-14 sm:h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
          <span className="text-lg sm:text-xl font-bold text-foreground">HMS</span>
        </div>

        <nav className="hidden lg:flex items-center space-x-8">
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#about"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
              <Button
                asChild
                size="sm"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-xs sm:text-sm"
              >
                <Link href={getDashboardLink(user.role)}>
                  <span className="hidden sm:inline">Go to Dashboard</span>
                  <span className="sm:hidden">Dashboard</span>
                </Link>
              </Button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/auth/register">Get Started</Link>
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-8 w-8 sm:h-10 sm:w-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t bg-background/95 backdrop-blur">
          <div className="container-responsive py-4 space-y-4">
            <nav className="flex flex-col space-y-3">
              <a
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#about"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </nav>

            {!user && (
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button variant="ghost" asChild className="justify-start">
                  <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground justify-start">
                  <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
