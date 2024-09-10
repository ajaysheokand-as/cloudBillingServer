const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const registerUser = async (req, res) => {
  const {shop_type, owner, address, mobile, email, password, type } = req.body;

  if (!type) {
    return res.status(400).json({ msg: "Registration type is required." });
  }

  console.log("Request Body:", req.body); // Log the request body

  try {
    // Check if user already exists
    let user = await User.findOne({ $or: [{ mobile }, { email }] });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      shop_type,
      owner,
      address,
      mobile,
      email,
      password,
      type,
    });

    user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const loginUser = async (req, res) => {
  console.log("User Login")
  const { emailOrMobile, password } = req.body;
  try {
    // Check if user exists by email or mobile
    // let user = await User.findOne({
    //   $or: [{ mobile: emailOrMobile }, { email: emailOrMobile }],
    // });

    let user;
    if (emailOrMobile.includes("@")) {
      user = await User.findOne({ email: emailOrMobile });
    } else {
      user = await User.findOne({ mobile: Number(emailOrMobile) });
    }

    if (!user) {
      return res.status(400).json({ msg: "Invalid Email or Phone Number" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Password" });
    }

    // Return JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      // { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token, registrationType: user.type });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const {
    // restaurant,
    name,
    owner,
    address,
    mobile,
    email,
    openingHours,
    qrCodeImageUrl,
  } = req.body;

  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update user fields
    // user.restaurant = restaurant || user.restaurant;
     user.name = name || user.name;
    user.owner = owner || user.owner;
    user.address = address || user.address;
    user.mobile = mobile || user.mobile;
    user.email = email || user.email;
    if (openingHours) {
      user.openingHours.mondayFriday =
        openingHours.mondayFriday || user.openingHours.mondayFriday;
      user.openingHours.saturdaySunday =
        openingHours.saturdaySunday || user.openingHours.saturdaySunday;
    }
    user.qrCodeImageUrl = qrCodeImageUrl || user.qrCodeImageUrl;

    await user.save();

    res.json({ msg: "User updated successfully", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = { registerUser, loginUser, getUserDetails, updateUser };
