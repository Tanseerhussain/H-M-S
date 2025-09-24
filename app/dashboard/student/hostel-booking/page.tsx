"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Wifi, Car, Utensils } from "lucide-react"

const hostels = [
  {
    id: 1,
    name: "Green Valley Hostel",
    location: "North Campus",
    price: 8000,
    available: 12,
    total: 50,
    amenities: ["WiFi", "Parking", "Mess"],
    image: "/modern-hostel-building.jpg",
  },
  {
    id: 2,
    name: "Gilgit-Baltistan Paradise Hostel",
    location: "South Campus",
    price: 7500,
    available: 8,
    total: 40,
    amenities: ["WiFi", "Mess", "Laundry"],
    image: "/student-residence-building.jpg",
  },
  {
    id: 3,
    name: "Campus Heights",
    location: "East Campus",
    price: 9000,
    available: 5,
    total: 60,
    amenities: ["WiFi", "Parking", "Mess", "Gym"],
    image: "/tall-hostel-building.jpg",
  },
]

export default function HostelBooking() {
  const [selectedHostel, setSelectedHostel] = useState<number | null>(null)
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    duration: "",
    roomType: "",
  })

  const handleBooking = () => {
    if (selectedHostel && bookingData.checkIn && bookingData.duration && bookingData.roomType) {
      alert("Booking request submitted successfully!")
      setSelectedHostel(null)
      setBookingData({ checkIn: "", duration: "", roomType: "" })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hostel Booking</h1>
          <p className="text-gray-600">Find and book your perfect hostel accommodation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hostel Listings */}
          <div className="lg:col-span-2 space-y-6">
            {hostels.map((hostel) => (
              <Card
                key={hostel.id}
                className={`cursor-pointer transition-all ${selectedHostel === hostel.id ? "ring-2 ring-indigo-500" : ""}`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <img
                      src={hostel.image || "/placeholder.svg"}
                      alt={hostel.name}
                      className="w-full md:w-48 h-48 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{hostel.name}</h3>
                        <Badge variant={hostel.available > 0 ? "default" : "destructive"}>
                          {hostel.available > 0 ? "Available" : "Full"}
                        </Badge>
                      </div>

                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{hostel.location}</span>
                      </div>

                      <div className="flex items-center text-gray-600 mb-4">
                        <Users className="h-4 w-4 mr-1" />
                        <span>
                          {hostel.available} available out of {hostel.total} rooms
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {hostel.amenities.map((amenity) => (
                          <Badge key={amenity} variant="outline" className="text-xs">
                            {amenity === "WiFi" && <Wifi className="h-3 w-3 mr-1" />}
                            {amenity === "Parking" && <Car className="h-3 w-3 mr-1" />}
                            {amenity === "Mess" && <Utensils className="h-3 w-3 mr-1" />}
                            {amenity}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold text-indigo-600"> ₨{hostel.price.toLocaleString()}/month</div>
                        <Button
                          onClick={() => setSelectedHostel(hostel.id)}
                          disabled={hostel.available === 0}
                          variant={selectedHostel === hostel.id ? "default" : "outline"}
                        >
                          {selectedHostel === hostel.id ? "Selected" : "Select"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Book Your Room</CardTitle>
                <CardDescription>
                  {selectedHostel
                    ? `Booking for ${hostels.find((h) => h.id === selectedHostel)?.name}`
                    : "Select a hostel to continue"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="checkin">Check-in Date</Label>
                  <Input
                    id="checkin"
                    type="date"
                    value={bookingData.checkIn}
                    onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
                    disabled={!selectedHostel}
                  />
                </div>

                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Select
                    value={bookingData.duration}
                    onValueChange={(value) => setBookingData({ ...bookingData, duration: value })}
                    disabled={!selectedHostel}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-month">1 Month</SelectItem>
                      <SelectItem value="3-months">3 Months</SelectItem>
                      <SelectItem value="6-months">6 Months</SelectItem>
                      <SelectItem value="1-year">1 Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="roomtype">Room Type</Label>
                  <Select
                    value={bookingData.roomType}
                    onValueChange={(value) => setBookingData({ ...bookingData, roomType: value })}
                    disabled={!selectedHostel}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Room</SelectItem>
                      <SelectItem value="double">Double Sharing</SelectItem>
                      <SelectItem value="triple">Triple Sharing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedHostel && (
                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Monthly Rent:</span>
                      <span> ₨{hostels.find((h) => h.id === selectedHostel)?.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Security Deposit:</span>
                      <span> ₨5,000</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>
                         ₨{((hostels.find((h) => h.id === selectedHostel)?.price || 0) + 5000).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleBooking}
                  className="w-full"
                  disabled={!selectedHostel || !bookingData.checkIn || !bookingData.duration || !bookingData.roomType}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
