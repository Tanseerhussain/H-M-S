// app/api/test/route.ts
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("hms_db") // apni DB ka naam yahan likho
    const collections = await db.listCollections().toArray()

    return new Response(JSON.stringify({ ok: true, collections }), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ ok: false, error: err }), { status: 500 })
  }
}
