// import { connectMongoDB } from "@/library/mongodb/mongodb";
// import User from "@/models/User/User";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     await connectMongoDB();

//     const { token, newPassword } = await req.json();

//     console.log("Received arguments:", { token, newPassword });

//     // Validate token (optional)
//     // You can implement token validation logic here, such as checking its existence
//     // in the database and ensuring it hasn't expired.

//     const user = await User.findOne({ resetToken: token });

//     if (!user || !user.resetTokenExpiration || user.resetTokenExpiration < Date.now()) {
//       return NextResponse.json(
//         { message: "Invalid or expired token" },
//         { status: 400 }
//       );
//     }

//     // Update user's password
//     user.password = newPassword; // Update the password directly on the User object
//     user.resetToken = null; // Clear the reset token after successful reset
//     user.resetTokenExpiration = null; // Clear the reset token expiration

//     await user.save();

//     return NextResponse.json(
//       { message: "Password reset successful" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error resetting password:", error);
//     return NextResponse.json(
//       { message: "Error resetting password", error: error.message },
//       { status: 500 }
//     );
//   }
// }

import { connectMongoDB } from "@/library/mongodb/mongodb";
import User from "@/models/User/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // Import bcrypt for hashing the password

export async function POST(req) {
  try {
    await connectMongoDB();

    const { token, newPassword } = await req.json();

    console.log("Received arguments:", { token, newPassword });

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

    return NextResponse.json(
      { message: "Password reset successful" },
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
