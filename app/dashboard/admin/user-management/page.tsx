"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, User, Mail, Phone, Edit, Trash2, Plus, Shield, UserCheck } from "lucide-react"

const users = [
  {
    id: 1,
    name: "Ali Haider",
    email: "Roy.doe@college.edu",
    phone: "+91 98765 43210",
    role: "student",
    status: "active",
    joinDate: "2023-08-15",
    lastLogin: "2024-01-16",
    hostel: "Green Valley Hostel",
    room: "A-101",
  },
  {
    id: 2,
    name: "Dr. Smith",
    email: "dr.smith@college.edu",
    phone: "+91 87654 32109",
    role: "warden",
    status: "active",
    joinDate: "2022-01-10",
    lastLogin: "2024-01-16",
    hostel: "Green Valley Hostel",
    room: "Warden Quarter",
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane.smith@college.edu",
    phone: "+91 76543 21098",
    role: "student",
    status: "active",
    joinDate: "2023-08-20",
    lastLogin: "2024-01-15",
    hostel: "Gilgit-Baltistan Paradise Hostel",
    room: "B-205",
  },
  {
    id: 4,
    name: "Prof. Johnson",
    email: "prof.johnson@college.edu",
    phone: "+91 65432 10987",
    role: "warden",
    status: "active",
    joinDate: "2021-06-15",
    lastLogin: "2024-01-16",
    hostel: "Gilgit-Baltistan Paradise Hostel",
    room: "Warden Quarter",
  },
  {
    id: 5,
    name: "Mike Johnson",
    email: "mike.johnson@college.edu",
    phone: "+91 54321 09876",
    role: "student",
    status: "inactive",
    joinDate: "2022-08-10",
    lastLogin: "2024-01-10",
    hostel: "Campus Heights",
    room: "C-301",
  },
]

export default function UserManagement() {
  const [usersList, setUsersList] = useState(users)
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "student",
    status: "active",
    hostel: "",
    room: "",
  })

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.phone) {
      if (editingUser) {
        setUsersList((prev) =>
          prev.map((user) =>
            user.id === editingUser
              ? {
                  ...user,
                  ...formData,
                  lastLogin: user.lastLogin,
                  joinDate: user.joinDate,
                }
              : user,
          ),
        )
        alert("User updated successfully!")
      } else {
        const newUser = {
          id: usersList.length + 1,
          ...formData,
          joinDate: new Date().toISOString().split("T")[0],
          lastLogin: "Never",
        }
        setUsersList([...usersList, newUser])
        alert("User added successfully!")
      }
      resetForm()
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "student",
      status: "active",
      hostel: "",
      room: "",
    })
    setShowForm(false)
    setEditingUser(null)
  }

  const handleEdit = (user: any) => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      hostel: user.hostel,
      room: user.room,
    })
    setEditingUser(user.id)
    setShowForm(true)
  }

  const handleDelete = (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsersList((prev) => prev.filter((user) => user.id !== userId))
      alert("User deleted successfully!")
    }
  }

  const handleStatusToggle = (userId: number) => {
    setUsersList((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  const filteredUsers = usersList.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
    const matchesRole = filterRole === "all" || user.role === filterRole
    const matchesStatus = filterStatus === "all" || user.status === filterStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4" />
      case "warden":
        return <UserCheck className="h-4 w-4" />
      case "student":
        return <User className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive"
      case "warden":
        return "secondary"
      case "student":
        return "default"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "default" : "destructive"
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
            <p className="text-gray-600">Manage user accounts and roles</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            {showForm ? "Cancel" : "Add User"}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingUser ? "Edit User" : "Add New User"}</CardTitle>
              <CardDescription>{editingUser ? "Update user information" : "Create a new user account"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="warden">Warden</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hostel">Hostel</Label>
                  <Input
                    id="hostel"
                    placeholder="Enter hostel name"
                    value={formData.hostel}
                    onChange={(e) => setFormData({ ...formData, hostel: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="room">Room</Label>
                  <Input
                    id="room"
                    placeholder="Enter room number"
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSubmit}>{editingUser ? "Update User" : "Add User"}</Button>
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="student">Students</SelectItem>
                  <SelectItem value="warden">Wardens</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Users ({filteredUsers.length})</CardTitle>
            <CardDescription>Manage all user accounts in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium text-gray-900">User</th>
                    <th className="text-left p-4 font-medium text-gray-900">Contact</th>
                    <th className="text-left p-4 font-medium text-gray-900">Role</th>
                    <th className="text-left p-4 font-medium text-gray-900">Status</th>
                    <th className="text-left p-4 font-medium text-gray-900">Location</th>
                    <th className="text-left p-4 font-medium text-gray-900">Last Login</th>
                    <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">ID: {user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span>{user.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={getRoleColor(user.role)} className="flex items-center gap-1 w-fit">
                          {getRoleIcon(user.role)}
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant={getStatusColor(user.status)}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <p className="font-medium">{user.hostel}</p>
                          <p className="text-gray-500">{user.room}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-gray-600">{user.lastLogin}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant={user.status === "active" ? "secondary" : "default"}
                            size="sm"
                            onClick={() => handleStatusToggle(user.id)}
                          >
                            {user.status === "active" ? "Deactivate" : "Activate"}
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
