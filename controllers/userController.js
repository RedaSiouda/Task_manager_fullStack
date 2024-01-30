const bcrypt = require('bcrypt');
const UserModel = require('../models/userSchema');

const createNewUser = async (req, res) => {
  try {
    const { username, name, password } = req.body;

    // Perform any additional validation here if needed

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user instance
    const newUser = new UserModel({
      username,
      name,
      password: hashedPassword, // Save the hashed password
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with the saved user object
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createNewUser,
};
