import { connectMongoDB } from "@/library/mongodb/mongodb"; // Import your MongoDB connection logic
import User from "@/models/User/User"; // Import your User model
import { createHmac } from 'crypto';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY; // Your Paystack secret key

export const POST = async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const rawBody = await req.text();
  const sig = req.headers.get('x-paystack-signature'); // Updated here
  const hash = createHmac('sha512', PAYSTACK_SECRET_KEY).update(rawBody).digest('hex');

  console.log(sig);
  console.log(hash);

  if (sig !== hash) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { event, data } = JSON.parse(rawBody);

  if (event === 'charge.success') {
    try {
      await connectMongoDB(); // Connect to the MongoDB server

      // Check if the user exists in the database
      const user = await User.findOne({ email: data.customer.email }).select("_id credits"); // Select _id and credits fields
      console.log("User found: ", user); // Log the user for debugging

      if (user) {
        // Update user credits based on the amount received
        user.credits += data.amount / 1000; // Assuming amount is in kobo
        await user.save(); // Save the updated user data
        console.log(`User credits updated: ${user.credits}`); // Log updated credits for verification
      } else {
        console.log("User not found"); // Log if the user does not exist
      }

      return new Response('Webhook received and user credits updated', { status: 200 });
    } catch (error) {
      console.error("Error updating user credits: ", error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }

  return new Response('Webhook received', { status: 200 });
};
