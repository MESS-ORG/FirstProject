const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const User = require("../models/user")
require("dotenv").config()

const router = express.Router()
const jwtSecret = process.env.JWT_SECRET

router.post("/signup", async (req, res) => {
  try {const { name, email, password } = req.body
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: "User already exists" }) }

    user = new User({ name, email, password })
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    await user.save()

    const token = jwt.sign({ userId: user._id }, jwtSecret)

    res.status(201).json({ token })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ message: "Server error" })
  }
})


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
