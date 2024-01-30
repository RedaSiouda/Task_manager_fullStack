const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/userSchema");

const generateToken = (userId) => {
  const fallbackSecret = 'YourSecureFallbackSecretHere';
  const tokenTimeoutInSeconds = 3600; // 1 hour, adjust as needed

  return jwt.sign({ userId }, process.env.JWT_SECRET || fallbackSecret, {
    expiresIn: tokenTimeoutInSeconds,
  });
};

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the password is available
    if (!user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If credentials are valid, generate a token
    const token = generateToken(user._id);

    // You may also want to send back additional user information if needed
    const userData = {
      userId: user._id,
      username: user.username,
      // Add other user properties as needed
    };

    res.json({ token, user: userData });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal error' });
  }
};

module.exports = {
  loginUser,
  generateToken,
};
