const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productName: String,
  quantity: Number,
  price: Number,
});

const billSchema = new mongoose.Schema({
  billId: Number,
  name: String,
  userId: { type: String, required: true },
  mobile: Number,
  section: String,
  index: Number,
  orderItems: [orderItemSchema],
  totalAmount: Number,
  subtotal: Number,
  paymentMethod: String,
  gst: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Bill = mongoose.model("BillField", billSchema);

module.exports = { Bill };
