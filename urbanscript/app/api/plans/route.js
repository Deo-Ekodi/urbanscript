import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { reference } = req.body;

        try {
            const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
                headers: {
                    Authorization: `Bearer process.env.PAYSTACK_SECRET_KEY`
                }
            });

            const paymentData = response.data.data;

            if (paymentData.status === 'success') {
                // Payment is successful, proceed with giving tokens to the user
                return res.status(200).json({ success: true, message: 'Payment verified' });
            } else {
                return res.status(400).json({ success: false, message: 'Payment verification failed' });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
