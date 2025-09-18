"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, User, Phone, Mail, MapPin, Calendar, AlertCircle, CheckCircle } from "lucide-react"

const students = [
  {
    id: 1,
    name: "John Doe",
    room: "A-101",
    block: "A",
    phone: "+91 98765 43210",
    email: "john.doe@college.edu",
    course: "Computer Science",
    year: "3rd Year",
    joinDate: "2023-08-15",
    status: "active",
    issues: 2,
    lastSeen: "2024-01-15",
    emergencyContact: "+91 98765 43211",
  },
  {
    id: 2,
    name: "Jane Smith",
    room: "B-205",
    block: "B",
    phone: "+91 87654 32109",
    email: "jane.smith@college.edu",
    course: "Mechanical Engineering",
    year: "2nd Year",
    joinDate: "2023-08-20",
    status: "active",
    issues: 0,
    lastSeen: "2024-01-16",
    emergencyContact: "+91 87654 32110",
  },
  {
    id: 3,
    name: "Mike Johnson",
    room: "C-301",
    block: "C",
    phone: "+91 76543 21098",
    email: "mike.johnson@college.edu",
    course: "Electrical Engineering",
    year: "4th Year",
    joinDate: "2022-08-10",
    status: "leaving",
    issues: 1,
    lastSeen: "2024-01-14",
    emergencyContact: "+91 76543 21099",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    room: "A-205",
    block: "A",
    phone: "+91 65432 10987",
    email: "sarah.wilson@college.edu",
    course: "Civil Engineering",
    year: "1st Year",
    joinDate: "2023-08-25",
    status: "active",
    issues: 3,
    lastSeen: "2024-01-13",
    emergencyContact: "+91 65432 10988",
  },
  {
    id: 5,
    name: "David Brown",
    room: "B-102",
    block: "B",
    phone: "+91 54321 09876",
    email: "david.brown@college.edu",
    course: "Information Technology",
    year: "3rd Year",
    joinDate: "2023-08-18",
    status: "active",
    issues: 0,
    lastSeen: "2024-01-16",
    emergencyContact: "+91 54321 09877",
  },
]

export default function StudentOversight() {
  const [studentsList, setStudentsList] = useState(students)
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBlock, setFilterBlock] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredStudents = studentsList.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.course.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBlock = filterBlock === "all" || student.block === filterBlock
    const matchesStatus = filterStatus === "all" || student.status === filterStatus

    return matchesSearch && matchesBlock && matchesStatus
  })

  const selectedStudentData = studentsList.find((s) => s.id === selectedStudent)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "leaving":
        return "secondary"
      case "inactive":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getIssuesColor = (issues: number) => {
    if (issues === 0) return "default"
    if (issues <= 2) return "secondary"
    return "destructive"
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Oversight</h1>
          <p className="text-gray-600">Monitor and manage student information and activities</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Students List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search students..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={filterBlock} onValueChange={setFilterBlock}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Block" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Blocks</SelectItem>
                      <SelectItem value="A">Block A</SelectItem>
                      <SelectItem value="B">Block B</SelectItem>
                      <SelectItem value="C">Block C</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="leaving">Leaving</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Students Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredStudents.map((student) => (
                <Card
                  key={student.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${selectedStudent === student.id ? "ring-2 ring-indigo-500" : ""}`}
                  onClick={() => setSelectedStudent(student.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{student.name}</h3>
                        <p className="text-sm text-gray-600">Room {student.room}</p>
                      </div>
                      <div className="flex gap-1">
                        <Badge variant={getStatusColor(student.status)}>{student.status}</Badge>
                        {student.issues > 0 && (
                          <Badge variant={getIssuesColor(student.issues)}>{student.issues} issues</Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1 text-sm text-gray-600">
                      <p>
                        {student.course} - {student.year}
                      </p>
                      <p>Last seen: {student.lastSeen}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Student Details */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Student Details</CardTitle>
                <CardDescription>
                  {selectedStudentData ? "View complete student information" : "Select a student to view details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedStudentData ? (
                  <div className="space-y-4">
                    <div className="text-center pb-4 border-b">
                      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <User className="h-8 w-8 text-indigo-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">{selectedStudentData.name}</h3>
                      <p className="text-sm text-gray-600">Room {selectedStudentData.room}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-sm text-gray-600">{selectedStudentData.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm text-gray-600">{selectedStudentData.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Block</p>
                          <p className="text-sm text-gray-600">Block {selectedStudentData.block}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Join Date</p>
                          <p className="text-sm text-gray-600">{selectedStudentData.joinDate}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium text-gray-900 mb-2">Academic Info</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Course:</span>
                          <span className="font-medium">{selectedStudentData.course}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Year:</span>
                          <span className="font-medium">{selectedStudentData.year}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Status:</span>
                          <Badge variant={getStatusColor(selectedStudentData.status)}>
                            {selectedStudentData.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium text-gray-900 mb-2">Emergency Contact</h4>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-red-500" />
                        <span className="text-sm">{selectedStudentData.emergencyContact}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">Issues & Complaints</h4>
                        <Badge variant={getIssuesColor(selectedStudentData.issues)}>{selectedStudentData.issues}</Badge>
                      </div>
                      {selectedStudentData.issues > 0 ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                            <span>Food complaint pending</span>
                          </div>
                          {selectedStudentData.issues > 1 && (
                            <div className="flex items-center gap-2 text-sm">
                              <AlertCircle className="h-4 w-4 text-red-500" />
                              <span>Room maintenance issue</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span>No active issues</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t space-y-2">
                      <Button className="w-full" size="sm">
                        Send Message
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent" size="sm">
                        View Full Profile
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Select a student from the list to view their complete information and manage their account.</p>
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
