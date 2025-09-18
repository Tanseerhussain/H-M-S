"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Bell, Send, Users, Calendar, Clock, AlertCircle } from "lucide-react"

const sentNotifications = [
  {
    id: 1,
    title: "Mess Timing Change",
    message: "Dinner timing has been changed to 7:00 PM - 9:00 PM starting tomorrow.",
    audience: "all-students",
    date: "2024-01-15",
    time: "10:30 AM",
    status: "sent",
  },
  {
    id: 2,
    title: "Room Inspection Notice",
    message: "Room inspection will be conducted on January 20th. Please ensure your rooms are clean.",
    audience: "block-a",
    date: "2024-01-14",
    time: "2:15 PM",
    status: "sent",
  },
  {
    id: 3,
    title: "WiFi Maintenance",
    message: "WiFi services will be temporarily unavailable tomorrow from 2 PM to 4 PM for maintenance.",
    audience: "all-students",
    date: "2024-01-13",
    time: "11:45 AM",
    status: "sent",
  },
]

export default function Notifications() {
  const [notifications, setNotifications] = useState(sentNotifications)
  const [showForm, setShowForm] = useState(false)
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    audience: "",
    priority: "normal",
    scheduleDate: "",
    scheduleTime: "",
  })

  const handleSendNotification = () => {
    if (newNotification.title && newNotification.message && newNotification.audience) {
      const notification = {
        id: notifications.length + 1,
        ...newNotification,
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "sent",
      }
      setNotifications([notification, ...notifications])
      setNewNotification({
        title: "",
        message: "",
        audience: "",
        priority: "normal",
        scheduleDate: "",
        scheduleTime: "",
      })
      setShowForm(false)
      alert("Notification sent successfully!")
    }
  }

  const getAudienceLabel = (audience: string) => {
    switch (audience) {
      case "all-students":
        return "All Students"
      case "block-a":
        return "Block A"
      case "block-b":
        return "Block B"
      case "block-c":
        return "Block C"
      case "new-students":
        return "New Students"
      default:
        return audience
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "destructive"
      case "high":
        return "secondary"
      case "normal":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-600">Send announcements and updates to students</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Bell className="h-4 w-4 mr-2" />
            {showForm ? "Cancel" : "New Notification"}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Send New Notification</CardTitle>
              <CardDescription>Create and send announcements to students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Notification Title</Label>
                <Input
                  id="title"
                  placeholder="Enter notification title"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message here..."
                  rows={4}
                  value={newNotification.message}
                  onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="audience">Send To</Label>
                  <Select
                    value={newNotification.audience}
                    onValueChange={(value) => setNewNotification({ ...newNotification, audience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-students">All Students</SelectItem>
                      <SelectItem value="block-a">Block A Students</SelectItem>
                      <SelectItem value="block-b">Block B Students</SelectItem>
                      <SelectItem value="block-c">Block C Students</SelectItem>
                      <SelectItem value="new-students">New Students</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newNotification.priority}
                    onValueChange={(value) => setNewNotification({ ...newNotification, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="schedule-date">Schedule Date (Optional)</Label>
                  <Input
                    id="schedule-date"
                    type="date"
                    value={newNotification.scheduleDate}
                    onChange={(e) => setNewNotification({ ...newNotification, scheduleDate: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="schedule-time">Schedule Time (Optional)</Label>
                  <Input
                    id="schedule-time"
                    type="time"
                    value={newNotification.scheduleTime}
                    onChange={(e) => setNewNotification({ ...newNotification, scheduleTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Notification Preview:</p>
                    <p className="mb-2">
                      <strong>{newNotification.title || "Your Title Here"}</strong>
                    </p>
                    <p>{newNotification.message || "Your message will appear here..."}</p>
                    <p className="mt-2 text-xs">
                      To: {getAudienceLabel(newNotification.audience) || "Select audience"} | Priority:{" "}
                      {newNotification.priority}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSendNotification}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Now
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Sent Notifications</h2>

          {notifications.map((notification) => (
            <Card key={notification.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{notification.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{notification.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={getPriorityColor(notification.priority)}>{notification.priority}</Badge>
                    <Badge variant="outline">
                      <Users className="h-3 w-3 mr-1" />
                      {getAudienceLabel(notification.audience)}
                    </Badge>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{notification.message}</p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Status: Delivered</span>
                  <span>Recipients: {notification.audience === "all-students" ? "150" : "50"} students</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
