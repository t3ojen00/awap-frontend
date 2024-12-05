import React, { useState } from "react";
import "./auth.css";
import apiClient from "../lib/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Signup function
  const signup = async (email, username, password) => {
    await apiClient.post("/users/registration", {
      email,
      user_name: username,
      password,
    });
  };

  // Handle Signup Form Submission
  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      // Perform signup and handle loading/toast feedback
      await toast.promise(signup(email, username, password), {
        loading: "Signing up...",
        success: "Sign up successful!",
        error: (error) => {
          console.error("Signup error:", {
            message: error.message,
            response: error.response,
            request: error.request,
          });
          return error.response?.data?.error || "An unexpected error occurred.";
        },
      });

      // Navigate to login on success
      navigate("/login");
    } catch (error) {
      console.error("Unexpected error during signup:", {
        message: error.message,
        response: error.response,
        request: error.request,
      });
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSignup} className="form">
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </span>
        </div>
        <div className="password-container">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
          </span>
        </div>
        <button type="submit">Sign Up</button>
        <i>
          **Password must contain at least one capital letter and one number
        </i>
      </form>
    </div>
  );
};

export default Signup;
