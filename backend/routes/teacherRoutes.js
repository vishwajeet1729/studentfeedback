const express = require("express");
const Teacher = require("../models/Teacher");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email.endsWith("@iiitn.ac.in")) {
      throw Error("Please register with institute mail id");
    }
    const teacher = new Teacher({
      name,
      email,
      password,
    });
    await teacher.save();
    res.status(200).json({ teacher });
  } catch (err) {
    console.log('reques made')
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await Teacher.findOne({ email, password });
    if (!teacher) {
      throw Error("email or password is wrong");
    }

    res.status(200).json({ teacher });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;

