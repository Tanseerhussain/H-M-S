"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Home,
  Building2,
  UtensilsCrossed,
  HelpCircle,
  LogOut,
  Menu,
  Bell,
  Users,
  MessageSquare,
  UserCheck,
  Settings,
  BarChart3,
  Shield,
} from "lucide-react"

interface SidebarProps {
  role: "student" | "warden" | "admin"
}

const navigationItems = {
  student: [
    { name: "Dashboard", href: "/dashboard/student", icon: Home },
    { name: "Hostel Booking", href: "/dashboard/student/hostel-booking", icon: Building2 },
    { name: "Food Complaints", href: "/dashboard/student/food-complaints", icon: UtensilsCrossed },
    { name: "Help Center", href: "/dashboard/student/help-center", icon: HelpCircle },
    { name: "Leaving Request", href: "/dashboard/student/leaving-request", icon: LogOut },
  ],
  warden: [
    { name: "Dashboard", href: "/dashboard/warden", icon: Home },
    { name: "Complaints", href: "/dashboard/warden/complaints", icon: MessageSquare },
    { name: "Leaving Requests", href: "/dashboard/warden/leaving-requests", icon: LogOut },
    { name: "Notifications", href: "/dashboard/warden/notifications", icon: Bell },
    { name: "Student Oversight", href: "/dashboard/warden/student-oversight", icon: Users },
  ],
  admin: [
    { name: "Dashboard", href: "/dashboard/admin", icon: Home },
    { name: "Manage Hostels", href: "/dashboard/admin/manage-hostels", icon: Building2 },
    { name: "User Management", href: "/dashboard/admin/user-management", icon: UserCheck },
    { name: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
  ],
}

const roleLabels = {
  student: "Student Portal",
  warden: "Warden Portal",
  admin: "Admin Portal",
}

const roleIcons = {
  student: Users,
  warden: Shield,
  admin: Settings,
}

function SidebarContent({ role }: SidebarProps) {
  const pathname = usePathname()
  const items = navigationItems[role]
  const RoleIcon = roleIcons[role]

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2">
          <RoleIcon className="h-6 w-6 text-indigo-600" />
          <span className="font-semibold text-gray-900">{roleLabels[role]}</span>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-10",
                    isActive && "bg-indigo-600 text-white hover:bg-indigo-700",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-4">
        <Link href="/auth/login">
          <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </Link>
      </div>
    </div>
  )
}

export function DashboardSidebar({ role }: SidebarProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden bg-transparent">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent role={role} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r">
        <SidebarContent role={role} />
      </div>
    </>
  )
}
