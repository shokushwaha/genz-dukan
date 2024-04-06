import { mongooseConnect } from '@/lib/mongoose';
import Coupon from '@/models/Coupon';

export default async function handler(req, res) {
    await mongooseConnect();

    if (req.method === 'POST') {
        const { code, imageurl } = req.body;

        console.log({ code, imageurl })

        try {
            const newCoupon = new Coupon({
                code,
                immg: imageurl,
                img: imageurl
            });

            const savedCoupon = await newCoupon.save();
            console.log(savedCoupon)
            res.status(201).json(savedCoupon);
        } catch (error) {
            console.error('Error saving coupon:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
