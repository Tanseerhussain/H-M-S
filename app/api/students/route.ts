import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server"
import { Student } from "../../../lib/models/User" // yahan aap apni interfaces ka path use karein

// POST => Add Student
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const newStudent: Student = {
      ...body,
      role: "student",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const client = await clientPromise
    const db = client.db("hms_db") // apni DB ka naam likho
    const result = await db.collection<Student>("students").insertOne(newStudent)

    return NextResponse.json({ ok: true, insertedId: result.insertedId })
  } catch (err) {
    console.error("❌ Error inserting student:", err)
    return NextResponse.json({ ok: false, error: "Failed to insert student" }, { status: 500 })
  }
}

// GET => Fetch All Students
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("hms_db")
    const students = await db.collection<Student>("students").find().toArray()
    // console.log("✅ Fetched students:", students)

    return NextResponse.json({ ok: true, students })
  } catch (err) {
    console.error("❌ Error fetching students:", err)
    return NextResponse.json({ ok: false, error: "Failed to fetch students" }, { status: 500 })
  }
}
