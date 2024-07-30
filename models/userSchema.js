// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   owner: {
//     type: String,
//     required: true,
//   },
//   name: {
//     // Generic field name for restaurant/store name
//     type: String,
//     required: true,
//     // unique: true,
//   },
//   mobile: {
//     type: Number,
//     required: true,
//     // unique: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     // unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   type: {
//     type: String,
//     required: true,
//     // enum: ["restaurant", "store"],
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });
// module.exports = mongoose.model("User", UserSchema);
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },

  name: {
  // restaurant: {
    type: String,
    required: true,
    unique: true, // Add unique constraint if needed
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
    required: true,
    enum: ["restaurant", "store"],
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
});


module.exports = mongoose.model("User", UserSchema);
