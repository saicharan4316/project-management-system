
import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function Reset() {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const resetPassword = async () => {
    try {
      await api.post(`/auth/reset-password/${token}`, { password });
      alert("Password reset successful");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="center">
      <div className="card">
        <h2>Reset Password</h2>

        <input
          type="password"
          className="input"
          placeholder="New password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="button" onClick={resetPassword}>
          Reset Password
        </button>
      </div>
    </div>
  );
}