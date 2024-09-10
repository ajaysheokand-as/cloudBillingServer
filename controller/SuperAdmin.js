const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const SuperAdmin = async (req, res) => {
  try {
    // Fetch all users excluding the ones with type 'superadmin'
    const users = await User.find({ type: { $ne: 'superadmin' } });
    
    // Send the user data to the frontend
    console.log('user users',users)
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = SuperAdmin;
