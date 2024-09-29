import { connectMongoDB } from "@/library/mongodb/mongodb";
import User from "@/models/User/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    console.log("user: ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error checking user existence: ", error);
    return NextResponse.json(
      { message: "Error checking user existence", error: error.message },
      { status: 500 }
    );
  }
}
