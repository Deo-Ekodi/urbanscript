import { connectMongoDB } from "@/library/mongodb/mongodb";
import User from "@/models/User/User";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    await connectMongoDB();

    const { email } = await req.json();

    // Validate email using a regular expression
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
        pass: process.env.GMAIL_PASSWORD, // Your Gmail app password
      },
    });

    // Create a stylish email content
    const resetLink = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password?token=${token}`; // Replace with your domain and reset password route
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center; padding-bottom: 20px;">
            <img src="${process.env.NEXT_PUBLIC_FRONTEND_URL}/favicon.ico" alt="UrbanScript Logo" style="width: 120px; height: auto;" />
          </div>
          <h2 style="color: #333; font-size: 24px; text-align: center; font-weight: bold;">Password Reset Request</h2>
          <p style="color: #555; font-size: 16px;">Hi,</p>
          <p style="color: #555; font-size: 16px;">You have requested a password reset for your account. Please click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="display: inline-block; background-color: #667eea; color: white; padding: 12px 20px; border-radius: 5px; text-decoration: none; font-size: 16px; font-weight: bold;">Reset Your Password</a>
          </div>
          <p style="color: #999; font-size: 14px;">If you did not request this password reset, please ignore this email.</p>
          <p style="color: #999; font-size: 12px;">This link will expire in 1 hour.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
          <div style="text-align: center;">
            <p style="color: #999; font-size: 12px;">UrbanScript Inc. | 123 Design Street | City, State, ZIP</p>
          </div>
        </div>
      </div>
    `;

    // Create email options
    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: "Reset Your Password",
      html: emailHtml,
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
