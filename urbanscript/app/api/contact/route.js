import { connectMongoDB } from "@/library/mongodb/mongodb";
import Contact from "@/models/Contact/Contact";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  // Destructure the incoming fields to match the frontend payload
  const { first_name, last_name, email, phone_number, message } = await req.json();

  try {
    // Connect to the database
    await connectMongoDB();

    // Create a new Contact document
    await Contact.create({ 
      first_name, 
      last_name, 
      email, 
      phone_number, 
      message 
    });

    // Return success response
    return NextResponse.json({
      message: "Message sent successfully",
      success: true,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      // Handle validation errors from mongoose
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      // console.log(errorList);
      return NextResponse.json({ message: errorList, success: false });
    } else {
      return NextResponse.json({ message: ["Unable to send message."], success: false });
    }
  }
}
