import type React from "react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function WardenDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout allowedRoles={["warden"]}>{children}</DashboardLayout>
}
