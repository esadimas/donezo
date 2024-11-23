const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    // check if exist user
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // hash password
    const hashPassword = bcrypt.hashSync(password, 10);

    // new user
    const newUser = await User.create({ name, email, password: hashPassword });

    const token = generateToken(newUser._id);

    res
      .status(201)
      .json({ userId: newUser._id, name: name, email: email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    // ambil data dari req body
    const { email, password } = req.body;

    // check user sudah di db atau tidak
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Register dulu" });
    }

    // check password user
    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    return res
      .status(200)
      .json({ userId: user._id, name: user.name, email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
