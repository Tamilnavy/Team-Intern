import { useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // Step 1 = Send OTP, Step 2 = Register
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Step 1: Send OTP
  const sendOtp = async (e) => {
    e.preventDefault();
    await API.post("/auth/sendotp", {
      name: form.name,
      email: form.email,
    });

    alert("OTP sent to your email");
    setStep(2);
  };

  // Step 2: Register
  const registerUser = async (e) => {
    e.preventDefault();

    await API.post("/auth/register", {
      name: form.name,
      email: form.email,
      password: form.password,
      otp: form.otp,
    });

    alert("Registration successful");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={step === 1 ? sendOtp : registerUser}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {step === 1 ? "Register - Send OTP" : "Enter OTP"}
        </h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          required
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          required
        />

        {step === 2 && (
          <>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="border p-2 w-full mb-3"
              required
            />

            <input
              name="otp"
              placeholder="Enter OTP"
              onChange={handleChange}
              className="border p-2 w-full mb-3"
              required
            />
          </>
        )}

        <button className="bg-green-600 text-white w-full p-2 rounded">
          {step === 1 ? "Send OTP" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;