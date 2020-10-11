const mongoose = require('mongoose');
const { ORDER_STATUS } = require('./order-status');

const OrderSchema = new mongoose.Schema({
    total: { type: Number, default: 0 },
    status: { type: String, enum: [...Object.values(ORDER_STATUS)], default: ORDER_STATUS.PENDING }
}, { timestamps: true });

module.exports = mongoose.model('order', OrderSchema);