import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("hostel_management")

    const hostels = await db.collection("hostels").find({}).sort({ name: 1 }).toArray()

    return NextResponse.json({ hostels })
  } catch (error) {
    console.error("Get hostels error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, address, capacity, amenities, wardenId } = await request.json()

    if (!name || !address || !capacity || !wardenId) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("hostel_management")

    const newHostel = {
      name,
      address,
      capacity,
      occupancy: 0,
      amenities: amenities || [],
      wardenId,
      rooms: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("hostels").insertOne(newHostel)

    return NextResponse.json(
      {
        hostel: { ...newHostel, _id: result.insertedId },
        message: "Hostel created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create hostel error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
