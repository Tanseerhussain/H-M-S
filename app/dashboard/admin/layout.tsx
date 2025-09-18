import type React from "react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout allowedRoles={["admin"]}>{children}</DashboardLayout>
}
