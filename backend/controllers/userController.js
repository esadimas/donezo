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

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({ name, email, password: hashPassword });

    const token = generateToken(newUser._id);

    return res.status(201).json({
      message: "User registered successfully",
      user: { userId: newUser._id, name: name, email: email, token },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const firstErrorMessage = Object.values(error.errors)[0].message;
      return res.status(400).send(firstErrorMessage);
    }
    return res.status(500).json({ message: "Intenal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    return res.status(201).json({
      message: "Login successful",
      token,
      user: { userId: user._id, name: user.name, email: email },
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Intenal server error" });
  }
};

const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile retrieved sucessfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Intenal server error" });
  }
};

module.exports = { registerUser, loginUser, userProfile };
