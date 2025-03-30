import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/pexels-pixabay-302769.jpg";

const API_URL = "https://reqres.in/"; // Replace with your backend API

const AuthForm = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Processing...");

    try {
      const endpoint = isRegister
        ? `${API_URL}/register`
        : `${API_URL}api/users?page=1`;
      const response = await axios.post(endpoint, formData);
      setMessage(response.data.message || "Success!");
      navigate("/users");
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.2)", // Semi-transparent white background
          backdropFilter: "blur(10px)", // Frosted glass effect
          WebkitBackdropFilter: "blur(10px)", // Frosted glass effect for Safari
          borderRadius: "12px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", // Subtle shadow
          padding: "20px",
          width: "300px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "bold",
            color: "#fff", // White text for contrast
          }}
        >
          {isRegister ? "Register" : "Login"}
        </h2>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid rgba(255, 255, 255, 0.5)", // Transparent border
                background: "rgba(255, 255, 255, 0.1)", // Transparent input background
                color: "#fff", // White text
                marginBottom: "10px",
              }}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid rgba(255, 255, 255, 0.5)",
              background: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
              marginBottom: "10px",
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid rgba(255, 255, 255, 0.5)",
              background: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
              marginBottom: "10px",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "rgba(0, 123, 255, 0.8)", // Semi-transparent blue
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "14px",
            cursor: "pointer",
            color: "#fff",
          }}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </p>
        {message && (
          <p
            style={{
              textAlign: "center",
              marginTop: "10px",
              color: "red",
              fontSize: "14px",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
