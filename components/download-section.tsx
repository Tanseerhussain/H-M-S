"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Smartphone, Download, LogIn, UserPlus } from "lucide-react"
import Link from "next/link"

interface AuthUser {
  email: string
  role: string
}

export function DownloadSection() {
  const [user, setUser] = useState<AuthUser | null>(null)

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
    <section className="py-20 bg-accent text-accent-foreground">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-12 drop-shadow-lg"> Join the Community of Smart Hostel Management </h1>
            <img
              src="/hms-mobile-app-interface-mockup-on-smartphone-show.jpg"
              alt="HMS Mobile App"
              className="mx-auto rounded-lg shadow-2xl"
            />
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-balance mb-6">
            {user ? "Access Your Dashboard" : "Join the Community of Smart Hostel Management"}
          </h2>
          <p className="text-xl text-accent-foreground/80 text-pretty mb-8 leading-relaxed">
            {user
              ? `Welcome back! Access your ${user.role} dashboard to manage your hostel experience.`
              : "Download the HMS app today and experience the future of hostel management. Available for both Android and iOS devices."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button
                size="lg"
                variant="secondary"
                className="bg-background text-foreground hover:bg-background/90"
                asChild
              >
                <Link href={getDashboardLink(user.role)}>
                  <LogIn className="mr-2 h-5 w-5" />
                  Go to Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-background text-foreground hover:bg-background/90"
                  asChild
                >
                  <Link href="/auth/login">
                    <LogIn className="mr-2 h-5 w-5" />
                    Login to HMS
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-background text-foreground hover:bg-background/90"
                  asChild
                >
                  <Link href="/auth/register">
                    <UserPlus className="mr-2 h-5 w-5" />
                    Register Now
                  </Link>
                </Button>
              </>
            )}
          </div>

          {user && (
            <div className="mt-8">
              <p className="text-accent-foreground/80 mb-4">Also available on mobile:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-accent-foreground/20 text-accent-foreground hover:bg-accent-foreground/10 bg-transparent"
                >
                  <Smartphone className="mr-2 h-4 w-4" />
                  Download for Android
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-accent-foreground/20 text-accent-foreground hover:bg-accent-foreground/10 bg-transparent"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download for iOS
                </Button>
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-center space-x-8 text-accent-foreground/60">
            <div className="text-center">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-sm">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">4.8★</div>
              <div className="text-sm">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm">Hostels</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
