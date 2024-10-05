import { connectMongoDB } from "@/library/mongodb/mongodb";
import User from "@/models/User/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer"; // Import nodemailer for sending emails

export async function POST(req) {
  try {
    await connectMongoDB();

    const { token, newPassword } = await req.json();

    const user = await User.findOne({ resetToken: token });

    if (!user || !user.resetTokenExpiration || user.resetTokenExpiration < Date.now()) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Hash the new password before saving it
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password and clear reset token fields
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiration = null;

    await user.save();

    // Create a stylish HTML email content for password reset success
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center; padding-bottom: 20px;">
            <img src="${process.env.NEXTAUTH_URL}/favicon.ico" alt="UrbanScript Logo" style="width: 120px; height: auto;" />
          </div>
          <div style="text-align: center;">
            <h1 style="color: #333; font-size: 24px; font-weight: bold;">Password Reset Successfully!</h1>
            <p style="color: #555; font-size: 16px;">Dear ${user.name},</p>
            <p style="color: #555; font-size: 16px;">Your password has been successfully changed. You can now log in using your new password.</p>
            <a href="${process.env.NEXTAUTH_URL}/login" style="display: inline-block; background-color: #667eea; color: white; padding: 12px 20px; border-radius: 5px; text-decoration: none; font-size: 16px; font-weight: bold; margin-top: 20px;">Log in to Your Account</a>
          </div>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
          <div style="text-align: center;">
            <p style="color: #999; font-size: 12px;">If you did not request this password change, please <a href="${process.env.NEXTAUTH_URL}/contact" style="color: #667eea; text-decoration: none;">contact our support team</a> immediately.</p>
            
            <div style="text-align: center; padding: 20px; font-size: 12px; color: #777;">
              &copy; ${new Date().getFullYear()} UrbanScript. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    `;

    // Set up Nodemailer to send the email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_EMAIL, // Your email address
        pass: process.env.GMAIL_PASSWORD, // Your email password or app password
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_EMAIL, // Your email address
      to: user.email, // The user's email address
      subject: "Your Password Has Been Reset",
      text: `Dear ${user.name},\n\nYour password has been successfully changed. You can now log in using your new password.\n\nIf you did not request this change, please contact our support team.\n\nBest regards,\nUrbanScript Team`,
      html: emailHtml, // Enhanced HTML email content
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Password reset successful. An email notification has been sent." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { message: "Error resetting password", error: error.message },
      { status: 500 }
    );
  }
}
