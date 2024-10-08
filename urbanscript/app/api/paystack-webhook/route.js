import { connectMongoDB } from "@/library/mongodb/mongodb"; // Import your MongoDB connection logic
import User from "@/models/User/User"; // Import your User model
import { createHmac } from 'crypto';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY; // Your Paystack secret key

export const POST = async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const rawBody = await req.text();
  const sig = req.headers.get('x-paystack-signature');
  const hash = createHmac('sha512', PAYSTACK_SECRET_KEY).update(rawBody).digest('hex');

  if (sig !== hash) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { event, data } = JSON.parse(rawBody);

  if (event === 'charge.success') {
    try {
      await connectMongoDB(); // Connect to MongoDB

      const user = await User.findOne({ email: data.customer.email }).select("_id credits"); // Find the user by email

      if (user) {
        const { currency, amount } = data; // Get currency and amount from Paystack data

        // Logic for USD transactions
        if (currency === 'USD') {
          if (amount === 500) {
            user.credits += 100; // $8 = 50 credits
          } else if (amount === 1000) {
            user.credits += 200; // $13 = 100 credits
          } else if (amount === 2500) {
            user.credits += 550; // $25 = 250 credits
          }
        }

        // Logic for KES transactions
        if (currency === 'KES') {
          if (amount === 66000) {
            user.credits += 100; // Ksh 1000 = 50 credits
          } else if (amount === 132000) {
            user.credits += 200; // Ksh 1700 = 100 credits
          } else if (amount === 325000) {
            user.credits += 550; // Ksh 3250 = 250 credits
          }
        }

        await user.save(); // Save the updated user data
        // console.log(`User credits updated: ${user.credits}`); // Log updated credits

        return new Response('Webhook received and user credits updated', { status: 200 });
      } else {
        // console.log("User not found");
        return new Response('User not found', { status: 404 });
      }
    } catch (error) {
      console.error("Error updating user credits: ", error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }

  return new Response('Webhook received', { status: 200 });
};
