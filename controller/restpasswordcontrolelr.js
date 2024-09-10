// Reset Password Handler

exports.resetPassword = async (req, res) => {
    try {
      const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }
  
      // In a real application, you would render a form here
      res.status(200).send('<h1>Reset Password</h1><form action="/api/reset-password/' + req.params.token + '" method="POST"><input type="password" name="password" placeholder="New Password" /><button type="submit">Reset Password</button></form>');
  
    } catch (error) {
      console.error("Error resetting password:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };  