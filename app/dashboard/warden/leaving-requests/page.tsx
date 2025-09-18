"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, CheckCircle, XCircle, User, Calendar, FileText, AlertTriangle } from "lucide-react"

const leavingRequests = [
  {
    id: 1,
    student: "John Doe",
    room: "A-101",
    reason: "Course Completion",
    requestDate: "2024-01-15",
    leavingDate: "2024-03-15",
    status: "pending",
    documents: ["Degree Certificate", "No Dues Certificate"],
    description: "I have completed my course and will be graduating next month. Need to vacate the hostel room.",
    contact: "+91 98765 43210",
  },
  {
    id: 2,
    student: "Jane Smith",
    room: "B-205",
    reason: "Transfer to Another College",
    requestDate: "2024-01-10",
    leavingDate: "2024-02-15",
    status: "pending",
    documents: ["Transfer Certificate", "Fee Receipt", "Parent Consent"],
    description: "Got admission in another college. Need to leave hostel by mid February.",
    contact: "+91 87654 32109",
  },
  {
    id: 3,
    student: "Mike Johnson",
    room: "C-301",
    reason: "Personal Reasons",
    requestDate: "2024-01-08",
    leavingDate: "2024-02-01",
    status: "approved",
    documents: ["Medical Certificate", "Parent Letter"],
    description: "Family emergency requires me to return home immediately.",
    contact: "+91 76543 21098",
  },
  {
    id: 4,
    student: "Sarah Wilson",
    room: "A-205",
    reason: "Financial Constraints",
    requestDate: "2024-01-05",
    leavingDate: "2024-01-31",
    status: "rejected",
    documents: ["Financial Statement"],
    description: "Unable to afford hostel fees due to family financial situation.",
    contact: "+91 65432 10987",
  },
]

export default function LeavingRequests() {
  const [requestsList, setRequestsList] = useState(leavingRequests)
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null)
  const [response, setResponse] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const handleStatusUpdate = (requestId: number, newStatus: string) => {
    setRequestsList((prev) =>
      prev.map((request) => (request.id === requestId ? { ...request, status: newStatus } : request)),
    )
    setSelectedRequest(null)
    setResponse("")
    alert(`Leaving request ${newStatus} successfully!`)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "approved":
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
      case "approved":
        return "default"
      case "rejected":
        return "destructive"
      default:
        return "default"
    }
  }

  const filteredRequests = requestsList.filter((request) => filterStatus === "all" || request.status === filterStatus)

  const selectedRequestData = requestsList.find((r) => r.id === selectedRequest)

  const isUrgent = (leavingDate: string) => {
    const leaving = new Date(leavingDate)
    const today = new Date()
    const diffTime = leaving.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 30
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaving Requests</h1>
          <p className="text-gray-600">Review and approve student leaving requests</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Requests List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Requests */}
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <Card
                  key={request.id}
                  className={`cursor-pointer transition-all ${selectedRequest === request.id ? "ring-2 ring-indigo-500" : ""}`}
                  onClick={() => setSelectedRequest(request.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {request.student} - Room {request.room}
                          </h3>
                          {isUrgent(request.leavingDate) && request.status === "pending" && (
                            <Badge variant="destructive" className="text-xs">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Urgent
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Reason: {request.reason.replace("-", " ")}</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Leaving: {request.leavingDate}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(request.status)} className="flex items-center gap-1">
                        {getStatusIcon(request.status)}
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                    </div>

                    <p className="text-gray-700 mb-3 line-clamp-2">{request.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{request.documents.length} documents submitted</span>
                      </div>
                      <span className="text-sm text-gray-500">Requested: {request.requestDate}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Request Details & Actions */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Request Details</CardTitle>
                <CardDescription>
                  {selectedRequestData ? "Review and take action" : "Select a request to view details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedRequestData ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{selectedRequestData.student}</h3>
                      <p className="text-sm text-gray-600 mb-4">{selectedRequestData.description}</p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Room:</span>
                        <span className="font-medium">{selectedRequestData.room}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Contact:</span>
                        <span className="font-medium">{selectedRequestData.contact}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Reason:</span>
                        <span className="font-medium">{selectedRequestData.reason.replace("-", " ")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Request Date:</span>
                        <span className="font-medium">{selectedRequestData.requestDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Leaving Date:</span>
                        <span className="font-medium">{selectedRequestData.leavingDate}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium text-gray-900 mb-2">Submitted Documents:</h4>
                      <div className="space-y-1">
                        {selectedRequestData.documents.map((doc, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <FileText className="h-4 w-4 text-green-600" />
                            <span>{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedRequestData.status === "pending" && (
                      <div className="space-y-4 pt-4 border-t">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Response/Notes (Optional)
                          </label>
                          <Textarea
                            placeholder="Add your response or additional notes..."
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                            rows={3}
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleStatusUpdate(selectedRequestData.id, "approved")}
                            className="flex-1"
                          >
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleStatusUpdate(selectedRequestData.id, "rejected")}
                            className="flex-1"
                          >
                            Reject
                          </Button>
                        </div>

                        {isUrgent(selectedRequestData.leavingDate) && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <div className="flex items-center gap-2 text-yellow-800">
                              <AlertTriangle className="h-4 w-4" />
                              <span className="text-sm font-medium">Urgent Request</span>
                            </div>
                            <p className="text-xs text-yellow-700 mt-1">
                              This request has a leaving date within 30 days. Please review promptly.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedRequestData.status === "approved" && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm text-green-800">
                          <strong>Approved:</strong> Student has been notified. Ensure room inspection is scheduled
                          before the leaving date.
                        </p>
                      </div>
                    )}

                    {selectedRequestData.status === "rejected" && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-sm text-red-800">
                          <strong>Rejected:</strong> Student has been notified with the reason for rejection.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Select a leaving request from the list to view details and take action.</p>
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
