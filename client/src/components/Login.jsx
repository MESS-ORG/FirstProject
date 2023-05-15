import React, { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import "./CSS/signup.css";
import "../pics/formimg.jpg";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = { email, password };
      const response = await login(user);
      localStorage.setItem("token", response.data.token);
  
      navigate("/Userpage");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
