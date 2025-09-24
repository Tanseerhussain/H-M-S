import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  const client = await clientPromise;
  const db = client.db('hostelManagement');

  const data = await request.json();

  // Insert complaint example:
  const result = await db.collection('complaints').insertOne({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'pending',
  });

  return NextResponse.json({ id: result.insertedId.toString() });
}

export async function GET() {
  const client = await clientPromise;
  const db = client.db('hostelManagement');

  const complaints = await db.collection('complaints').find({}).toArray();

  return NextResponse.json(complaints);
}


// import { type NextRequest, NextResponse } from "next/server"
// import clientPromise from "@/lib/mongodb"

// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url)
//     const studentId = searchParams.get("studentId")
//     const hostelId = searchParams.get("hostelId")

//     const client = await clientPromise
//     const db = client.db("hostel_management")

//     let filter = {}
//     if (studentId) filter = { studentId }
//     if (hostelId) filter = { ...filter, hostelId }

//     const complaints = await db.collection("complaints").find(filter).sort({ createdAt: -1 }).toArray()

//     return NextResponse.json({ complaints })
//   } catch (error) {
//     console.error("Get complaints error:", error)
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const { studentId, studentName, hostelId, type, title, description, priority } = await request.json()

//     if (!studentId || !studentName || !hostelId || !type || !title || !description) {
//       return NextResponse.json({ error: "All fields are required" }, { status: 400 })
//     }

//     const client = await clientPromise
//     const db = client.db("hostel_management")

//     const newComplaint = {
//       studentId,
//       studentName,
//       hostelId,
//       type,
//       title,
//       description,
//       status: "pending",
//       priority: priority || "medium",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     }

//     const result = await db.collection("complaints").insertOne(newComplaint)

//     return NextResponse.json(
//       {
//         complaint: { ...newComplaint, _id: result.insertedId },
//         message: "Complaint submitted successfully",
//       },
//       { status: 201 },
//     )
//   } catch (error) {
//     console.error("Create complaint error:", error)
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }
