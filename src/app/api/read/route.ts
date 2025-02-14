import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

export async function GET() {
    try {
        await client.connect();
        const database = client.db("IndianExp"); // Replace with your database name
        const collection = database.collection("tour_packages");
        const result = await collection.find({}).toArray();

        return NextResponse.json(
            { success: true, data: result },
        );

    } catch (error: any) {
        console.error("❌ Error fetching tour packages:", error.message);
        return NextResponse.json(
            { error: "Failed to fetch tour packages", details: error.message },
            { status: 500 }
        );
    } finally {
        await client.close();
    }
}
