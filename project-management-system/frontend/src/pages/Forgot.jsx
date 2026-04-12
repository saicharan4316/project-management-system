
import { useState } from "react";
import api from "../api/axios";

export default function Forgot() {
  const [email, setEmail] = useState("");

  const sendReset = async () => {
    try {
      await api.post("/auth/forgot-password", { email });
      alert("Reset email sent");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="center">
      <div className="card">
        <h2>Forgot Password</h2>

        <input
          className="input"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="button" onClick={sendReset}>
          Send Reset Link
        </button>
      </div>
    </div>
  );
}