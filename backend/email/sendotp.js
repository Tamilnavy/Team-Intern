const nodemailer = require("nodemailer");
const dotEnv = require("dotenv");
dotEnv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendOtpEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"OTP VERIFICATION" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "YOUR OTP CODE ✔",
    html: `
      <h2>Your OTP is: ${otp}</h2>
      <p>This OTP is valid for <b>5 minutes</b>.</p>
    `,
  });
};
