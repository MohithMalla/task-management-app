// src/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/tasks");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-2"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control mb-2"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="btn btn-success w-100">Login</button>
      </form>
      <div className="register mt-5 text-center">
        <h3>Don't have an account ? <button className="btn btn-primary" onClick={() => navigate("/register")}>
        Register
      </button></h3>
      </div>
    </div>
  );
}

export default Login;
