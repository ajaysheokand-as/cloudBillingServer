const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  shop_type: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true, // Add unique constraint if needed
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Add unique constraint if needed
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  openingHours: {
    mondayFriday: {
      type: String,
      default: "9 :00 AM - 10:00 PM"
    },
    saturdaySunday: {
      type: String,
      default: "11:00 AM - 11:00 PM"
    },
  },
  qrCodeImageUrl: {
    type: String,
    default: ""
  },
  upiId: {
    type: String,
    default: "UPI not set",
  },
  resetPasswordToken: String,
  
  resetPasswordExpires: Date,
  type: {
    type: String,
    // enum: ['user', 'admin', 'superadmin'],
  },
});

module.exports = mongoose.model("User", UserSchema);
