"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { UtensilsCrossed, Building2, HelpCircle, LogOut, Bell, Bed } from "lucide-react"

export default function StudentDashboard() {
  const dashboardActions = [
    {
      title: "Hostel Booking",
      description: "Browse and book available hostel rooms",
      icon: Building2,
      href: "/dashboard/student/hostel-booking",
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      title: "Food Complaints",
      description: "Report issues with hostel food quality or service",
      icon: UtensilsCrossed,
      href: "/dashboard/student/food-complaints",
      color: "bg-red-50 text-red-600 border-red-200",
    },
    {
      title: "Help Center",
      description: "Get assistance and find answers to common questions",
      icon: HelpCircle,
      href: "/dashboard/student/help-center",
      color: "bg-orange-50 text-orange-600 border-orange-200",
    },
    {
      title: "Leaving Request",
      description: "Submit requests to leave the hostel temporarily",
      icon: LogOut,
      href: "/dashboard/student/leaving-request",
      color: "bg-yellow-50 text-yellow-600 border-yellow-200",
    },
  ]

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Student Dashboard</h1>
          <p className="text-gray-600">
            Manage your hostel experience with ease. Access all student services from one place.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Status</CardTitle>
              <Badge variant="default">Active</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-indigo-600">Enrolled</div>
              <p className="text-xs text-gray-500">Hostel registration complete</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Bell className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">2</div>
              <p className="text-xs text-gray-500">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Room Status</CardTitle>
              <Bed className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Assigned</div>
              <p className="text-xs text-gray-500">Room 204, Block A</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardActions.map((action, index) => {
              const IconComponent = action.icon
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={action.href}>
                      <Button variant="outline" className="w-full bg-transparent">
                        Access Feature
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest interactions with the hostel system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Room booking confirmed</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Leaving request submitted</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Food complaint resolved</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
