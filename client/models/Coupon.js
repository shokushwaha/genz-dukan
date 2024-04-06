const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
    code: {
        type: String,
    },
    imageurl: {
        type: String,
    }
});

const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema);

module.exports = Coupon;
