import { mongooseConnect } from '@/lib/mongoose';
import Coupon from '@/models/Coupon';

export default async function handler(req, res) {
    await mongooseConnect();

    if (req.method === 'GET') {

        try {
            const data = await Coupon.find({});
            return res.status(200).json(data);
        } catch (error) {
            console.log('Error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

    }
}
