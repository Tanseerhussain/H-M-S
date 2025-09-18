"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, AlertCircle, CheckCircle, XCircle, User, Calendar } from "lucide-react"

const complaints = [
  {
    id: 1,
    title: "Poor Food Quality in Mess",
    category: "quality",
    status: "pending",
    priority: "high",
    date: "2024-01-15",
    student: "John Doe",
    room: "A-101",
    description: "The food served today was undercooked and tasteless. This has been happening frequently.",
  },
  {
    id: 2,
    title: "Late Dinner Service",
    category: "timing",
    status: "in-review",
    priority: "medium",
    date: "2024-01-14",
    student: "Jane Smith",
    room: "B-205",
    description: "Dinner was served 2 hours late without any prior notice. Students were waiting.",
  },
  {
    id: 3,
    title: "Unhygienic Kitchen Conditions",
    category: "hygiene",
    status: "pending",
    priority: "high",
    date: "2024-01-13",
    student: "Mike Johnson",
    room: "C-301",
    description: "Noticed unclean utensils and poor kitchen maintenance during mess visit.",
  },
  {
    id: 4,
    title: "Limited Menu Variety",
    category: "variety",
    status: "resolved",
    priority: "low",
    date: "2024-01-10",
    student: "Sarah Wilson",
    room: "A-205",
    description: "Same menu items repeated frequently. Need more variety in daily meals.",
  },
]

export default function ComplaintsManagement() {
  const [complaintsList, setComplaintsList] = useState(complaints)
  const [selectedComplaint, setSelectedComplaint] = useState<number | null>(null)
  const [response, setResponse] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")

  const handleStatusUpdate = (complaintId: number, newStatus: string) => {
    setComplaintsList((prev) =>
      prev.map((complaint) => (complaint.id === complaintId ? { ...complaint, status: newStatus } : complaint)),
    )
    setSelectedComplaint(null)
    setResponse("")
    alert(`Complaint ${newStatus} successfully!`)
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const filteredComplaints = complaintsList.filter((complaint) => {
    const statusMatch = filterStatus === "all" || complaint.status === filterStatus
    const priorityMatch = filterPriority === "all" || complaint.priority === filterPriority
    return statusMatch && priorityMatch
  })

  const selectedComplaintData = complaintsList.find((c) => c.id === selectedComplaint)

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complaints Management</h1>
          <p className="text-gray-600">Review and manage student food complaints</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Complaints List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-review">In Review</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Select value={filterPriority} onValueChange={setFilterPriority}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priority</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Complaints */}
            <div className="space-y-4">
              {filteredComplaints.map((complaint) => (
                <Card
                  key={complaint.id}
                  className={`cursor-pointer transition-all ${selectedComplaint === complaint.id ? "ring-2 ring-indigo-500" : ""}`}
                  onClick={() => setSelectedComplaint(complaint.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{complaint.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>
                              {complaint.student} - Room {complaint.room}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{complaint.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={getPriorityColor(complaint.priority)}>{complaint.priority}</Badge>
                        <Badge variant={getStatusColor(complaint.status)} className="flex items-center gap-1">
                          {getStatusIcon(complaint.status)}
                          {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-3">
                      <Badge variant="outline" className="text-xs">
                        {complaint.category.charAt(0).toUpperCase() + complaint.category.slice(1)}
                      </Badge>
                    </div>

                    <p className="text-gray-700 line-clamp-2">{complaint.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Complaint Details & Actions */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Complaint Details</CardTitle>
                <CardDescription>
                  {selectedComplaintData ? "Review and take action" : "Select a complaint to view details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedComplaintData ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{selectedComplaintData.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{selectedComplaintData.description}</p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Student:</span>
                        <span className="font-medium">{selectedComplaintData.student}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Room:</span>
                        <span className="font-medium">{selectedComplaintData.room}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Date:</span>
                        <span className="font-medium">{selectedComplaintData.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Category:</span>
                        <span className="font-medium">{selectedComplaintData.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Priority:</span>
                        <Badge variant={getPriorityColor(selectedComplaintData.priority)}>
                          {selectedComplaintData.priority}
                        </Badge>
                      </div>
                    </div>

                    {selectedComplaintData.status === "pending" && (
                      <div className="space-y-4 pt-4 border-t">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Response (Optional)</label>
                          <Textarea
                            placeholder="Add your response or resolution notes..."
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                            rows={3}
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleStatusUpdate(selectedComplaintData.id, "resolved")}
                            className="flex-1"
                          >
                            Resolve
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleStatusUpdate(selectedComplaintData.id, "rejected")}
                            className="flex-1"
                          >
                            Reject
                          </Button>
                        </div>

                        <Button
                          variant="outline"
                          onClick={() => handleStatusUpdate(selectedComplaintData.id, "in-review")}
                          className="w-full"
                        >
                          Mark as In Review
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Select a complaint from the list to view details and take action.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
