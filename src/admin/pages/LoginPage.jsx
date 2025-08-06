import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useLoginWithEmailMutation,
  useVerifyOtpMutation,
} from "../redux/apis/Auth"; // adjust path as needed

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1: send OTP, Step 2: verify OTP

  const [sendOtp, { isLoading: isSending }] = useLoginWithEmailMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) return alert("Enter your email");
    try {
      const res = await sendOtp(email);
      if (res?.data || res?.status === 200) {
        alert("OTP sent to your email");
        setStep(2);
      } else {
        alert("Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return alert("Enter OTP");
    try {
      const res = await verifyOtp({ email, otp });
      console.log("Verify OTP Response:", res);

      if (res?.data?.token) {
        // ✅ authSlice handles saving to localStorage as 'adminDetails'
        alert("Login successful!");
        navigate("/admin");
      } else {
        alert("OTP verification failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong verifying OTP");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md p-6 flex flex-col items-center">
        <img
          src="/logo.png"
          alt="Yash Enterprises Logo"
          className="w-40 h-auto mb-6"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full text-lg px-4 py-2 mb-4 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full text-lg px-4 py-2 mb-6 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <div className="w-full flex gap-4">
          {step === 1 && (
            <button
              onClick={handleSendOtp}
              disabled={isSending}
              className="w-1/2 bg-[#F59E0B] hover:bg-[#d48806] text-white font-semibold py-2 px-4 rounded-md"
            >
              {isSending ? "Sending..." : "Send OTP"}
            </button>
          )}

          {step === 2 && (
            <button
              onClick={handleVerifyOtp}
              disabled={isVerifying}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md"
            >
              {isVerifying ? "Verifying..." : "Login"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
