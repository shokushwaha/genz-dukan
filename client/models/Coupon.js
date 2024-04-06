const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
    code: {
        type: String,
    },
    img: {
        type: String,
    },
    immg: {
        type: String,
    }
});

const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema);

module.exports = Coupon;
