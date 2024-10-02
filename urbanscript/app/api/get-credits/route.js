import { connectMongoDB } from "@/library/mongodb/mongodb";
import User from "@/models/User/User";

export const POST = async (req) => {
    const { email } = await req.json();

    try {
        await connectMongoDB(); // Connect to your MongoDB

        const user = await User.findOne({ email });
        if (user) {
            return new Response(JSON.stringify({ credits: user.credits }), {
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
        console.error("Error fetching user credits: ", error);
        return new Response(JSON.stringify({ message: "Internal Server Error", error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
