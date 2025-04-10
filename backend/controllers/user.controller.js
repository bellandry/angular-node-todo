const bcrypt = require("bcryptjs");
const User = require("../models/user");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existing = await User.findOne({ username });
    if (existing)
      return res.status(400).json({ message: "Username already exists" });

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register };
