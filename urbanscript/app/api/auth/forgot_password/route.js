import { connectMongoDB } from "@/library/mongodb/mongodb";
import User from "@/models/User/User";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    await connectMongoDB();

    const { email } = await req.json();

    // Validate email using a regular expression or a validation library
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select("_id");

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Generate a random token and store it in the database
    const token = Math.random().toString(36).substr(2, 11);
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 1); // Set token expiration to 1 hour

    await User.updateOne(
      { _id: user._id },
      { $set: { resetToken: token, resetTokenExpiration: tokenExpiration } }
    );

    // Configure nodemailer for sending email with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_EMAIL, // Your Gmail address
        pass: process.env.GMAIL_PASSWORD, // Your Gmail app password (not regular password)
      },
    });

    // Create email content
    const resetLink = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password?token=${token}`; // Replace with your domain and reset password route
    const emailBody = `
      <p>You have requested a password reset for your account.</p>
      <p>Click on the following link to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 1 hour.</p>
    `;
      // to: 'deogratiusekodi@gmail.com',
    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: "Password Reset Link",
      html: emailBody,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Password reset email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking user existence: ", error);
    return NextResponse.json(
      { message: "Error checking user existence", error: error.message },
      { status: 500 }
    );
  }
}

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
