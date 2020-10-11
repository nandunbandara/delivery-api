const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    total: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('order', OrderSchema);