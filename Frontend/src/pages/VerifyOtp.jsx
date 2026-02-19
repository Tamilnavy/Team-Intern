import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/verify-otp", { email, otp });
      alert("Account Verified ✅");
      navigate("/login");
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  return (
    <form onSubmit={handleVerify}>
      <h2>Verify OTP</h2>

      <input value={email} disabled />

      <input
        placeholder="Enter OTP"
        onChange={(e) => setOtp(e.target.value)}
      />

      <button type="submit">Verify</button>
    </form>
  );
}

export default VerifyOtp;
