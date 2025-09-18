export interface Hostel {
  _id?: string
  name: string
  address: string
  capacity: number
  occupancy: number
  amenities: string[]
  wardenId: string
  rooms: Room[]
  createdAt: Date
  updatedAt: Date
}

export interface Room {
  roomNumber: string
  capacity: number
  occupancy: number
  type: "single" | "double" | "triple"
  rent: number
  available: boolean
  students: string[]
}
