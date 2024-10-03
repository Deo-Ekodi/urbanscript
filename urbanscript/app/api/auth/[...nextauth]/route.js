import { connectMongoDB } from "@/library/mongodb/mongodb";
import User from "@/models/User/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

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

          // Check if the user is verified
          if (!user.verified) {
            throw new Error("Your account is not verified. Please check your email.");
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
          throw new Error(error.message); // This message can be displayed to the user
        }
      },
    }),
  ],
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
