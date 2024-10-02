import { connectMongoDB } from "@/library/mongodb/mongodb"; // Import your MongoDB connection logic
import User from "@/models/User/User"; // Import your User model

export const POST = async (req) => {
    const { email, creditsToDeduct } = await req.json(); // Extract data from the request

    try {
        await connectMongoDB(); // Connect to MongoDB

        const user = await User.findOne({ email });
        if (user) {
            user.credits -= creditsToDeduct; // Deduct the credits
            await user.save(); // Save the updated user
            return new Response(JSON.stringify({ message: "Credits deducted successfully." }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ message: "User not found." }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        console.error("Error deducting credits: ", error);
        return new Response(JSON.stringify({ message: "Internal Server Error", error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
