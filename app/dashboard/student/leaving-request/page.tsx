"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertCircle, CheckCircle, XCircle, FileText } from "lucide-react"

const existingRequests = [
  {
    id: 1,
    reason: "Course Completion",
    requestDate: "2024-01-15",
    leavingDate: "2024-03-15",
    status: "pending",
    documents: ["Degree Certificate", "No Dues Certificate"],
  },
  {
    id: 2,
    reason: "Transfer to Another College",
    requestDate: "2024-01-01",
    leavingDate: "2024-02-01",
    status: "approved",
    documents: ["Transfer Certificate", "Fee Receipt"],
  },
]

export default function LeavingRequest() {
  const [requests, setRequests] = useState(existingRequests)
  const [showForm, setShowForm] = useState(false)
  const [newRequest, setNewRequest] = useState({
    reason: "",
    leavingDate: "",
    description: "",
    documents: [] as string[],
  })

  const handleSubmit = () => {
    if (newRequest.reason && newRequest.leavingDate && newRequest.description) {
      const request = {
        id: requests.length + 1,
        ...newRequest,
        requestDate: new Date().toISOString().split("T")[0],
        status: "pending",
      }
      setRequests([request, ...requests])
      setNewRequest({ reason: "", leavingDate: "", description: "", documents: [] })
      setShowForm(false)
      alert("Leaving request submitted successfully!")
    }
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaving Request</h1>
            <p className="text-gray-600">Submit and track your hostel leaving requests</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "New Request"}</Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Submit Leaving Request</CardTitle>
              <CardDescription>Please provide details for your hostel leaving request</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="reason">Reason for Leaving</Label>
                <Select
                  value={newRequest.reason}
                  onValueChange={(value) => setNewRequest({ ...newRequest, reason: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="course-completion">Course Completion</SelectItem>
                    <SelectItem value="transfer">Transfer to Another College</SelectItem>
                    <SelectItem value="personal">Personal Reasons</SelectItem>
                    <SelectItem value="financial">Financial Constraints</SelectItem>
                    <SelectItem value="health">Health Issues</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="leaving-date">Preferred Leaving Date</Label>
                <Input
                  id="leaving-date"
                  type="date"
                  value={newRequest.leavingDate}
                  onChange={(e) => setNewRequest({ ...newRequest, leavingDate: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed explanation for your leaving request..."
                  rows={4}
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                />
              </div>

              <div>
                <Label>Required Documents (Check all that apply)</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    "No Dues Certificate",
                    "Room Handover Form",
                    "Identity Card Return",
                    "Medical Certificate",
                    "Parent Consent Letter",
                    "Transfer Certificate",
                  ].map((doc) => (
                    <label key={doc} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newRequest.documents.includes(doc)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewRequest({
                              ...newRequest,
                              documents: [...newRequest.documents, doc],
                            })
                          } else {
                            setNewRequest({
                              ...newRequest,
                              documents: newRequest.documents.filter((d) => d !== doc),
                            })
                          }
                        }}
                      />
                      <span className="text-sm">{doc}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">Important Notice:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Minimum 30 days notice period required</li>
                      <li>Security deposit will be refunded after room inspection</li>
                      <li>All dues must be cleared before leaving</li>
                      <li>Room keys and ID card must be returned</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSubmit}>Submit Request</Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Your Leaving Requests</h2>

          {requests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {request.reason.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Requested: {request.requestDate}</span>
                      <span>Leaving Date: {request.leavingDate}</span>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(request.status)} className="flex items-center gap-1">
                    {getStatusIcon(request.status)}
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </Badge>
                </div>

                {request.documents && request.documents.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Required Documents:</p>
                    <div className="flex flex-wrap gap-2">
                      {request.documents.map((doc) => (
                        <Badge key={doc} variant="outline" className="text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {request.status === "approved" && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Approved:</strong> Your leaving request has been approved. Please complete the checkout
                      process by the specified date and ensure all documents are submitted.
                    </p>
                  </div>
                )}

                {request.status === "rejected" && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Rejected:</strong> Your leaving request has been rejected. Please contact the warden for
                      more information or submit a new request with additional details.
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
