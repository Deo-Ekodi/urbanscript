import { connectMongoDB } from "@/library/mongodb/mongodb";
import User from "@/models/User/User";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET(req) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ success: false, message: "Token is missing." }, { status: 400 });
    }

    // Find the user with the corresponding verification token
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiration: { $gt: Date.now() }, // Check if the token is still valid (not expired)
    });

    if (!user) {
      return NextResponse.json({ success: false, message: "Token is invalid or has expired." }, { status: 400 });
    }

    // Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined; // Clear the verification token
    user.verificationTokenExpiration = undefined; // Clear the expiration time
    await user.save();

    // Create a more stylish HTML email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center; padding-bottom: 20px;">
            <img src="${process.env.NEXTAUTH_URL}/favicon.ico" alt="UrbanScript Logo" style="width: 120px; height: auto;" />
          </div>
          <div style="text-align: center;">
            <h1 style="color: #333; font-size: 24px; font-weight: bold;">Welcome to UrbanScript, ${user.name}!</h1>
            <p style="color: #555; font-size: 16px;">Your account has been successfully verified.</p>
            <p style="color: #555; font-size: 16px;">You can now log in and explore all the amazing features we offer.</p>
            <a href="${process.env.NEXTAUTH_URL}/login" style="display: inline-block; background-color: #667eea; color: white; padding: 12px 20px; border-radius: 5px; text-decoration: none; font-size: 16px; font-weight: bold; margin-top: 20px;">Log in to Your Account</a>
          </div>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
          <div style="text-align: center;">
            <p style="color: #999; font-size: 12px;">If you have any questions, feel free to <a href="${process.env.NEXTAUTH_URL}/contact" style="color: #667eea; text-decoration: none;">contact our support team</a>.</p>
            <p style="color: #999; font-size: 12px;">UrbanScript LLC. | Kimathi Street | Nyeri, Kenya</p>
          </div>
        </div>
      </div>
    `;

    // Send a registration success email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_EMAIL, // Your email address
        pass: process.env.GMAIL_PASSWORD, // Your email password (or App password if using Gmail)
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_EMAIL, // Your email address
      to: user.email, // The user's email address
      subject: "Welcome to UrbanScript! Registration Successful",
      text: `Dear ${user.name},\n\nYour account has been successfully verified. You can now log in and access all features.\n\nBest regards,\nUrbanScript Team`,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Account verified successfully. A confirmation email has been sent." });
  } catch (error) {
    console.error("Error during token verification: ", error);
    return NextResponse.json({ success: false, message: "Failed to verify the token.", error: error.message }, { status: 500 });
  }
}
