import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role, studentId, hostelId } = await request.json()

    if (!email || !password || !name || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("hostel_management")

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email })

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user object
    const newUser = {
      email,
      password: hashedPassword,
      name,
      role,
      ...(role === "student" && { studentId, hostelId }),
      ...(role === "warden" && { hostelId }),
      ...(role === "admin" && { permissions: ["manage_users", "manage_hostels"] }),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Insert user
    const result = await db.collection("users").insertOne(newUser)

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json(
      {
        user: { ...userWithoutPassword, _id: result.insertedId },
        message: "User created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
