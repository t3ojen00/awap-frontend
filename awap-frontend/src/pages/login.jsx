import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import "./auth.css"; // Ensure you have the correct path to your app.css file
import api from "../lib/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    toast.promise(
      api.post("/users/login", { email, password }).then((res) => {
        const d = res.data;
        login(d.token, {
          id: d.userId,
          email: d.email,
        });
        navigate("/showtimes");
      }),
      {
        loading: "Logging in...",
        success: "Login successful!",
        error: (d) => {
          return d.response.data.error ?? "Login failed!";
        },
      }
    );
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleLogin}>
        <h2 className="form-title">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
