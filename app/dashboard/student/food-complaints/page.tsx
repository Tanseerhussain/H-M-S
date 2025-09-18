"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react"

const existingComplaints = [
  {
    id: 1,
    title: "Poor Food Quality in Mess",
    category: "quality",
    status: "pending",
    date: "2024-01-15",
    description: "The food served today was undercooked and tasteless.",
  },
  {
    id: 2,
    title: "Late Dinner Service",
    category: "timing",
    status: "resolved",
    date: "2024-01-10",
    description: "Dinner was served 2 hours late without any prior notice.",
  },
  {
    id: 3,
    title: "Unhygienic Kitchen Conditions",
    category: "hygiene",
    status: "in-review",
    date: "2024-01-08",
    description: "Noticed unclean utensils and poor kitchen maintenance.",
  },
]

export default function FoodComplaints() {
  const [complaints, setComplaints] = useState(existingComplaints)
  const [newComplaint, setNewComplaint] = useState({
    title: "",
    category: "",
    description: "",
  })
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = () => {
    if (newComplaint.title && newComplaint.category && newComplaint.description) {
      const complaint = {
        id: complaints.length + 1,
        ...newComplaint,
        status: "pending",
        date: new Date().toISOString().split("T")[0],
      }
      setComplaints([complaint, ...complaints])
      setNewComplaint({ title: "", category: "", description: "" })
      setShowForm(false)
      alert("Complaint submitted successfully!")
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "in-review":
        return <AlertCircle className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "default"
      case "in-review":
        return "secondary"
      case "resolved":
        return "default"
      case "rejected":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Food Complaints</h1>
            <p className="text-gray-600">Submit and track your food-related complaints</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "New Complaint"}</Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Submit New Complaint</CardTitle>
              <CardDescription>Describe your food-related concern in detail</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Complaint Title</Label>
                <Input
                  id="title"
                  placeholder="Brief title for your complaint"
                  value={newComplaint.title}
                  onChange={(e) => setNewComplaint({ ...newComplaint, title: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newComplaint.category}
                  onValueChange={(value) => setNewComplaint({ ...newComplaint, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select complaint category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quality">Food Quality</SelectItem>
                    <SelectItem value="hygiene">Hygiene Issues</SelectItem>
                    <SelectItem value="timing">Service Timing</SelectItem>
                    <SelectItem value="variety">Menu Variety</SelectItem>
                    <SelectItem value="staff">Staff Behavior</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed description of the issue..."
                  rows={4}
                  value={newComplaint.description}
                  onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSubmit}>Submit Complaint</Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Your Complaints</h2>

          {complaints.map((complaint) => (
            <Card key={complaint.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{complaint.title}</h3>
                    <p className="text-sm text-gray-500">Submitted on {complaint.date}</p>
                  </div>
                  <Badge variant={getStatusColor(complaint.status)} className="flex items-center gap-1">
                    {getStatusIcon(complaint.status)}
                    {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                  </Badge>
                </div>

                <div className="mb-3">
                  <Badge variant="outline" className="text-xs">
                    {complaint.category.charAt(0).toUpperCase() + complaint.category.slice(1)}
                  </Badge>
                </div>

                <p className="text-gray-700">{complaint.description}</p>

                {complaint.status === "resolved" && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Resolution:</strong> Thank you for your feedback. We have addressed this issue and
                      implemented measures to prevent it in the future.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
