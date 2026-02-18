const User = require("../models/User");
const { generateOtp } = require("../email/generateotp");
const { sendOtpEmail } = require("../email/sendotp");

exports.sendOtp = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({ msg: "Email Required" });
    }

    // check if already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists. Please login." });
    }

    // generate OTP
    const otp = generateOtp();

    // expiry 5 minutes
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    // Save OTP in DB (temporary user)
    let user = await User.findOneAndUpdate(
      { email },
      { name, email, otp, otpExpires },
      { new: true, upsert: true }
    );

    // Send Email
    await sendOtpEmail(email, otp);

    res.json({ msg: "OTP sent to email" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};
