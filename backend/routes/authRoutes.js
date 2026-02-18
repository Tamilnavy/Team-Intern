const express = require("express");
const { registerUser, loginUser, refreshToken } = require("../controllers/authController");
const { sendOtp } = require("../controllers/emailController");   // ✅ ADD THIS

const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");


// 🔹 OTP Route (ADD THIS)
router.post("/sendotp", sendOtp);


// 🔹 Protected Profile
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});


// 🔹 Admin Route
router.get("/admin-test", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin" });
});


// 🔹 Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);

module.exports = router;
