const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// 🔹 REGISTER WITH OTP
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, address, phone, otp } = req.body;

    // 1️⃣ Check if OTP requested
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Please request OTP first" });
    }

    // 2️⃣ Check OTP
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // 3️⃣ Check OTP expiry
    if (user.otpExpires < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // 4️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5️⃣ Update user with full details
    user.name = name;
    user.password = hashedPassword;
    user.role = role || "user";
    user.address = address;
    user.phone = phone;

    // remove OTP after verification
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// 🔹 LOGIN (NO OTP)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !user.password) {
      return res.status(400).json({ message: "User not found or not registered" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Access Token (short)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }   // keep short for testing
    );

    // Refresh Token (long)
    const refreshTokenValue = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshTokenValue;
    await user.save();

    res.json({
      message: "Login successful",
      token,
      refreshToken: refreshTokenValue,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// 🔹 REFRESH TOKEN (FIXED BUG)
const refreshToken = async (req, res) => {
  try {
    const { refreshToken: tokenFromBody } = req.body;

    if (!tokenFromBody) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decoded = jwt.verify(
      tokenFromBody,
      process.env.JWT_REFRESH_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== tokenFromBody) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.json({ token: newAccessToken });

  } catch (error) {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};


module.exports = { registerUser, loginUser, refreshToken };
