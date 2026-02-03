import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.json({ success: false, message: "Email already exists" });

    const user = new User({ name, email, password });
    await user.save();

    res.json({ success: true, message: "Registered successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    if (user.password !== password)
      return res.json({ success: false, message: "Wrong password" });

    res.json({ success: true, message: "Login success", user });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

export default router;
