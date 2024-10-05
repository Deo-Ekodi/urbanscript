import { connectMongoDB } from "@/library/mongodb/mongodb";
import User from "@/models/User/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();

    // Create the user with verification token and expiration
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpiration = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiration,
    });

    // Send verification email

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_EMAIL, // Your Gmail address
        pass: process.env.GMAIL_PASSWORD, // Your Gmail app password (not regular password)
      },
    });

    const verificationURL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register/verify?token=${verificationToken}`;

    const emailBody = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #4caf50; color: white; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
            <h1>Welcome to UrbanScript!</h1>
          </div>
          <div style="padding: 30px;">
            <h2 style="color: #333;">Activate Your Account</h2>
            <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>
            <p style="font-size: 16px;">
              You're almost there! Click the button below to verify your email address and activate your account.
            </p>
            <a href="${verificationURL}" style="display: inline-block; background-color: #4caf50; color: white; padding: 15px 25px; border-radius: 5px; text-decoration: none; font-size: 16px; margin-top: 20px;">Verify Account</a>
            <p style="font-size: 14px; margin-top: 20px;">If the button above doesn't work, you can copy and paste the following link into your browser:</p>
            <p style="font-size: 14px; background-color: #f9f9f9; padding: 10px; border-radius: 5px; border: 1px solid #e0e0e0;">${verificationURL}</p>
            <p style="font-size: 14px; margin-top: 20px;">This link will expire in 24 hours.</p>
            <p style="font-size: 16px; margin-top: 30px;">Thank you for joining UrbanScript! We're excited to have you.</p>
          </div>
        </div>
        <div style="text-align: center; padding: 20px; font-size: 12px; color: #777;">
          &copy; ${new Date().getFullYear()} UrbanScript. All rights reserved.
        </div>
      </div>
    `;


    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: "Verify your account",
      html: emailBody,
    };

    // await transporter.sendMail(mailOptions);

    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email: ", err);
      } 
      else {
        console.log("Email sent: ", info.response);
        console.log("token sent: ", verificationToken);
      }
    });
    

    return NextResponse.json({ message: "User registered. Verification email sent." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "An error occurred while registering the user.", error: error.message }, { status: 500 });
  }
}
