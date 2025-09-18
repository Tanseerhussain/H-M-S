export interface User {
  _id?: string
  email: string
  password: string
  role: "student" | "warden" | "admin"
  name: string
  studentId?: string
  hostelId?: string
  createdAt: Date
  updatedAt: Date
}

export interface Student extends User {
  role: "student"
  studentId: string
  hostelId?: string
  roomNumber?: string
  course?: string
  year?: number
}

export interface Warden extends User {
  role: "warden"
  hostelId: string
  department?: string
}

export interface Admin extends User {
  role: "admin"
  permissions: string[]
}
