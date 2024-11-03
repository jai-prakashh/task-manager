const express = require("express");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = ({
  userId,
  type = process.env.JWT_SECRET,
  expiresIn = "24h",
}) => {
  return jwt.sign({ id: userId }, type, { expiresIn });
};

const login = async ({ payload, res }) => {
  const { email, password } = payload;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  // Generate tokens
  const accessToken = createToken({
    userId: user._id,
    type: process.env.JWT_SECRET,
    expiresIn: "24h",
  });

  const refreshToken = createToken({
    userId: user._id,
    type: process.env.JWT_REFRESH,
    expiresIn: "7h",
  });

  // Save refresh token in the database
  user.refreshToken = refreshToken;
  await user.save();

  // Send tokens
  res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
  return accessToken;
};

const refreshToken = async (refreshToken) => {
  if (!refreshToken)
    return res.status(403).json({ message: "Refresh token required" });

  try {
    // Find user by refresh token
    const user = await User.findOne({ refreshToken });
    if (!user)
      return res.status(403).json({ message: "Invalid refresh token" });

    // Verify refresh token
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
      if (err)
        return res.status(403).json({ message: "Token expired or invalid" });

      // Generate new access token
      const newAccessToken = createToken({
        userId: user._id,
        type: process.env.JWT_SECRET,
        expiresIn: "24h",
      });

      res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  login,
  refreshToken,
};
