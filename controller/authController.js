// controllers/authController.js
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuth = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub, name, email } = payload;

    // Check if user exists
    let user = await User.findOne({ googleId: sub });
    if (!user) {
      // If user doesn't exist, create a new user
      user = new User({
        googleId: sub,
        name: name,
        email: email,
      });
      await user.save();
    }

    // Generate JWT for the user
    const jwtToken = jwt.sign(
      { user: { id: user.id } },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token: jwtToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = { googleAuth };
 