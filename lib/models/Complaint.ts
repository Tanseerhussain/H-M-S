export interface Complaint {
  _id?: string
  studentId: string
  studentName: string
  hostelId: string
  type: "food" | "maintenance" | "cleanliness" | "other"
  title: string
  description: string
  status: "pending" | "in-progress" | "resolved" | "rejected"
  priority: "low" | "medium" | "high"
  wardenResponse?: string
  createdAt: Date
  updatedAt: Date
}
