import { connectMongoDB } from "@/library/mongodb/mongodb";
import User from "@/models/User/User";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
      await connectMongoDB();
      
      const { searchParams } = new URL(req.url);
      const token = searchParams.get("token");
  
    //   console.log("Token received: ", token); // Log the token received
  
      if (!token) {
        return NextResponse.json({ success: false, message: "Token is missing." }, { status: 400 });
      }
  
      // Find the user with the corresponding verification token
      const user = await User.findOne({
        verificationToken: token,
        verificationTokenExpiration: { $gt: Date.now() }, // Check if the token is still valid (not expired)
      });
  
    //   console.log("User found: ", user); // Log user found or not found
  
      if (!user) {
        return NextResponse.json({ success: false, message: "Token is invalid or has expired." }, { status: 400 });
      }
  
      // Mark the user as verified
      user.verified = true;
      user.verificationToken = undefined; // Clear the verification token
      user.verificationTokenExpiration = undefined; // Clear the expiration time
      await user.save();
  
    //   console.log("User successfully verified: ", user);
  
      return NextResponse.json({ success: true, message: "Account verified successfully." });
    } catch (error) {
      console.error("Error during token verification: ", error);
      return NextResponse.json({ success: false, message: "Failed to verify the token.", error: error.message }, { status: 500 });
    }
  }
  