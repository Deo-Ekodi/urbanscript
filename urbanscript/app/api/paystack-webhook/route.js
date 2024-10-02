// pages/api/paystack-webhook.js
import { connectMongoDB } from "@/library/mongodb/mongodb"; // Import your MongoDB connection logic
import User from "@/models/User/User"; // Import your User model
import { createHmac } from 'crypto';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY; // Your Paystack secret key

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const sig = req.headers['x-paystack-signature'];
    const hash = createHmac('sha512', PAYSTACK_SECRET_KEY).update(JSON.stringify(req.body)).digest('hex');

    // Verify the webhook signature
    if (sig !== hash) {
      return res.status(401).send('Unauthorized');
    }

    const { event, data } = req.body;

    // Handle the 'charge.success' event
    if (event === 'charge.success') {
      try {
        await connectMongoDB(); // Connect to the database

        // Find the user by email (or any other unique identifier)
        const user = await User.findOne({ email: data.email });

        if (user) {
          // Assuming the amount is in kobo, so divide by 100 to get the value in your currency
          user.credits += data.amount / 100; // Update credits
          await user.save(); // Save the updated user
        }

        return res.status(200).send('Webhook received');
      } catch (error) {
        console.error("Error updating user credits: ", error);
        return res.status(500).send('Internal Server Error');
      }
    }

    return res.status(200).send('Webhook received');
  } else {
    return res.status(405).send('Method not allowed');
  }
};

export default handler;
