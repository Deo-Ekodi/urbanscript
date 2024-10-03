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
      <h2>Account Verification</h2>
      <p>Click the link below to verify your account:</p>
      <a href="${verificationURL}">Verify Account</a>
      <p>This link will expire in 24 hours.</p>
    `;

    const mailOptions = {
      to: user.email,
      from: process.env.GMAIL_USER,
      subject: "Verify your account",
      html: emailBody,
    };

    // await transporter.sendMail(mailOptions);

    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email: ", err);
      } 
      // else {
        // console.log("Email sent: ", info.response);
        // console.log("token sent: ", verificationToken);
      // }
    });
    

    return NextResponse.json({ message: "User registered. Verification email sent." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "An error occurred while registering the user." }, { status: 500 });
  }
}
