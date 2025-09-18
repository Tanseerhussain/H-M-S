"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
  redirectTo?: string
}

export function ProtectedRoute({ children, allowedRoles = [], redirectTo = "/auth/login" }: ProtectedRouteProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")

    if (!userData) {
      router.push(redirectTo)
      return
    }

    try {
      const user = JSON.parse(userData)

      if (allowedRoles.length === 0 || allowedRoles.includes(user.role)) {
        setIsAuthorized(true)
      } else {
        // Redirect to appropriate dashboard based on role
        switch (user.role) {
          case "student":
            router.push("/dashboard/student")
            break
          case "warden":
            router.push("/dashboard/warden")
            break
          default:
            router.push("/")
        }
      }
    } catch (error) {
      router.push(redirectTo)
    }
  }, [router, allowedRoles, redirectTo])

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}
