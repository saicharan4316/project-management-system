
import { useState } from "react";
import api from "../api/axios";
import "../styles/global.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const login = async () => {
    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      window.location.href = `/${res.data.role.toLowerCase()}`;
    } catch (err) {
      alert(err || "Login failed");
    }
  };
// .response?.data?.msg
  return (
    <div className="center">
      <div className="card">
        <h2 className="title">Login</h2>

        <input
          className="input"
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="button" onClick={login}>
          Login
        </button>
        <p
  style={{ marginTop: "10px", cursor: "pointer", color: "#2f80ed" }}
  onClick={() => window.location.href = "/forgot"}
>
  Forgot Password?
</p>
      </div>
    </div>
  );
}