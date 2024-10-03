import { connectMongoDB } from "@/library/mongodb/mongodb";
import User from "@/models/User/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import nodemailer from "nodemailer";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            throw new Error("No user found with this email.");
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            throw new Error("Password is incorrect.");
          }

          if (!user.verified) {
            throw new Error("Your account is not verified. Please check your email.");
          }

          return user;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
      profile(profile) {
        return {
          id: profile.sub || profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectMongoDB();
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // If the user doesn't exist, create a new user
          const newUser = await User.create({
            name: user.name,
            email: user.email,
            verified: true, // Automatically mark as verified for Google OAuth
            credits: 2, // Initialize with some default credits
          });

          // Optionally send a welcome email
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.GMAIL_EMAIL,
              pass: process.env.GMAIL_PASSWORD,
            },
          });

          const emailBody = `
            <h2>Registration Successful</h2>
            <p>Welcome, ${newUser.name}! Your registration was successful.</p>
          `;

          const mailOptions = {
            to: newUser.email,
            from: process.env.GMAIL_EMAIL,
            subject: "Welcome to Our Service",
            html: emailBody,
          };

          await transporter.sendMail(mailOptions);
        }

        return true; // Continue with sign-in
      } catch (error) {
        console.error("Error during Google sign-in:", error);
        return false; // Deny sign-in if there's an issue
      }
    },

    async session({ session, token, user }) {
      session.user.id = token.sub; // Attach the user ID to the session
      return session;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.sub = user.id; // Set the user ID on the JWT token
      }
      return token;
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/", // Redirect to sign-in page if unauthorized
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
