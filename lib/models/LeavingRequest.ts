export interface LeavingRequest {
  _id?: string
  studentId: string
  studentName: string
  hostelId: string
  reason: string
  fromDate: Date
  toDate: Date
  status: "pending" | "approved" | "rejected"
  wardenResponse?: string
  emergencyContact: {
    name: string
    phone: string
    relation: string
  }
  createdAt: Date
  updatedAt: Date
}
