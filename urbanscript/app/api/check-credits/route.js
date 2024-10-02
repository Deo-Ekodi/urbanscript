// /api/check-credits.js
import { connectMongoDB } from "@/library/mongodb/mongodb";
import User from "@/models/User/User";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongoDB();
        const { email } = await req.json(); // Get email from request body
        const user = await User.findOne({ email }).select("credits"); // Get only credits field
        return NextResponse.json({ credits: user ? user.credits : 0 }); // Return user's credits
    } catch (error) {
        console.error("Error checking user credits: ", error);
        return NextResponse.json(
            { message: "Error checking user credits", error: error.message },
            { status: 500 }
        );
    }
}
