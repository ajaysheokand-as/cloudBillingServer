const mongoose = require("mongoose");

const expensisesSchema = new mongoose.Schema({
    srno: Number,
    userId: { type: String, required: true },
    date: String,
    title: String,
    price: Number,
    description: String,
    timestamp: {
        type: Date,
        default: Date.now,
    }
});

const Expens = mongoose.model("expensisesField", expensisesSchema);

module.exports = { Expens };
