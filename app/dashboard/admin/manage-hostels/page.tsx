"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Wifi, Car, Utensils, Edit, Trash2, Plus } from "lucide-react"

const hostels = [
  {
    id: 1,
    name: "Green Valley Hostel",
    location: "North Campus",
    totalRooms: 50,
    occupiedRooms: 38,
    price: 8000,
    amenities: ["WiFi", "Parking", "Mess", "Laundry"],
    status: "active",
    warden: "Dr. Smith",
    contact: "+91 98765 43210",
  },
  {
    id: 2,
    name: "Sunrise Residence",
    location: "South Campus",
    totalRooms: 40,
    occupiedRooms: 32,
    price: 7500,
    amenities: ["WiFi", "Mess", "Laundry"],
    status: "active",
    warden: "Prof. Johnson",
    contact: "+91 87654 32109",
  },
  {
    id: 3,
    name: "Campus Heights",
    location: "East Campus",
    totalRooms: 60,
    occupiedRooms: 55,
    price: 9000,
    amenities: ["WiFi", "Parking", "Mess", "Gym"],
    status: "active",
    warden: "Dr. Wilson",
    contact: "+91 76543 21098",
  },
  {
    id: 4,
    name: "Heritage Block",
    location: "West Campus",
    totalRooms: 30,
    occupiedRooms: 0,
    price: 6500,
    amenities: ["WiFi", "Mess"],
    status: "maintenance",
    warden: "Prof. Brown",
    contact: "+91 65432 10987",
  },
]

export default function ManageHostels() {
  const [hostelsList, setHostelsList] = useState(hostels)
  const [showForm, setShowForm] = useState(false)
  const [editingHostel, setEditingHostel] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    totalRooms: "",
    price: "",
    amenities: [] as string[],
    status: "active",
    warden: "",
    contact: "",
  })

  const handleSubmit = () => {
    if (formData.name && formData.location && formData.totalRooms && formData.price) {
      if (editingHostel) {
        setHostelsList((prev) =>
          prev.map((hostel) =>
            hostel.id === editingHostel
              ? {
                  ...hostel,
                  ...formData,
                  totalRooms: Number.parseInt(formData.totalRooms),
                  price: Number.parseInt(formData.price),
                }
              : hostel,
          ),
        )
        alert("Hostel updated successfully!")
      } else {
        const newHostel = {
          id: hostelsList.length + 1,
          ...formData,
          totalRooms: Number.parseInt(formData.totalRooms),
          price: Number.parseInt(formData.price),
          occupiedRooms: 0,
        }
        setHostelsList([...hostelsList, newHostel])
        alert("Hostel added successfully!")
      }
      resetForm()
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
      totalRooms: "",
      price: "",
      amenities: [],
      status: "active",
      warden: "",
      contact: "",
    })
    setShowForm(false)
    setEditingHostel(null)
  }

  const handleEdit = (hostel: any) => {
    setFormData({
      name: hostel.name,
      location: hostel.location,
      totalRooms: hostel.totalRooms.toString(),
      price: hostel.price.toString(),
      amenities: hostel.amenities,
      status: hostel.status,
      warden: hostel.warden,
      contact: hostel.contact,
    })
    setEditingHostel(hostel.id)
    setShowForm(true)
  }

  const handleDelete = (hostelId: number) => {
    if (confirm("Are you sure you want to delete this hostel?")) {
      setHostelsList((prev) => prev.filter((hostel) => hostel.id !== hostelId))
      alert("Hostel deleted successfully!")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "maintenance":
        return "secondary"
      case "inactive":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getOccupancyColor = (occupied: number, total: number) => {
    const percentage = (occupied / total) * 100
    if (percentage >= 90) return "destructive"
    if (percentage >= 70) return "secondary"
    return "default"
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Hostels</h1>
            <p className="text-gray-600">Add, edit, and manage hostel properties</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            {showForm ? "Cancel" : "Add Hostel"}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingHostel ? "Edit Hostel" : "Add New Hostel"}</CardTitle>
              <CardDescription>
                {editingHostel ? "Update hostel information" : "Create a new hostel property"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Hostel Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter hostel name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="totalRooms">Total Rooms</Label>
                  <Input
                    id="totalRooms"
                    type="number"
                    placeholder="Number of rooms"
                    value={formData.totalRooms}
                    onChange={(e) => setFormData({ ...formData, totalRooms: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="price">Monthly Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Price per month"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
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
                      <SelectItem value="maintenance">Under Maintenance</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="warden">Warden Name</Label>
                  <Input
                    id="warden"
                    placeholder="Enter warden name"
                    value={formData.warden}
                    onChange={(e) => setFormData({ ...formData, warden: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input
                    id="contact"
                    placeholder="Enter contact number"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {["WiFi", "Parking", "Mess", "Laundry", "Gym", "Library", "Recreation", "Security"].map((amenity) => (
                    <label key={amenity} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              amenities: [...formData.amenities, amenity],
                            })
                          } else {
                            setFormData({
                              ...formData,
                              amenities: formData.amenities.filter((a) => a !== amenity),
                            })
                          }
                        }}
                      />
                      <span className="text-sm">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSubmit}>{editingHostel ? "Update Hostel" : "Add Hostel"}</Button>
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostelsList.map((hostel) => (
            <Card key={hostel.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{hostel.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{hostel.location}</span>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(hostel.status)}>{hostel.status}</Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Occupancy:</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={getOccupancyColor(hostel.occupiedRooms, hostel.totalRooms)}>
                        {hostel.occupiedRooms}/{hostel.totalRooms}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        ({Math.round((hostel.occupiedRooms / hostel.totalRooms) * 100)}%)
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Monthly Rent:</span>
                    <span className="font-semibold text-indigo-600">₹{hostel.price.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Warden:</span>
                    <span className="text-sm font-medium">{hostel.warden}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Amenities:</p>
                  <div className="flex flex-wrap gap-1">
                    {hostel.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        {amenity === "WiFi" && <Wifi className="h-3 w-3 mr-1" />}
                        {amenity === "Parking" && <Car className="h-3 w-3 mr-1" />}
                        {amenity === "Mess" && <Utensils className="h-3 w-3 mr-1" />}
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => handleEdit(hostel)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" className="flex-1" onClick={() => handleDelete(hostel.id)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
