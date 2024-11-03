const express = require("express");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const { login, refreshToken } = require("../services/authService");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  let user = new User({ username, password });
  user = await user.save();
  res.status(201).json({ message: "User created" });
});

// Login
router.post("/login", async (req, res) => {
  const token = await login({ payload: req.body, res });
  res.json({ token });
});

// Refresh Token

router.post("/refresh", async (req, res) => {
  const newAccesToken = await refreshToken(req.cookies.refreshToken);
  res.json({ token: newAccesToken });
});

module.exports = router;
