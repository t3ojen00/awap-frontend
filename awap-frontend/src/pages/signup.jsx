import React, { useState } from "react";
import "./auth.css";
import apiClient from "../lib/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signup = async (email, password) => {
    await apiClient.post("/users/registration", {
      email,
      password,
    });
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    toast.promise(signup(email, password), {
      loading: "Signing up...",
      success: (data) => {
        navigate("/login");
        return "Sign up successful!";
      },
      error: (d) => {
        console.log(d);
        return d.response.data.error;
      },
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSignup} className="form">
        <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
