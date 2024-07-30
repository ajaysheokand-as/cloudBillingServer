const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

  category: String,
  userId: { type: String, required: true },
  productName: String,
  price: Number,
  description: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model("category", categorySchema);

module.exports = { Category };
