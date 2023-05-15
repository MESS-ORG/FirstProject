import React, { useState } from "react";
import { signup } from "../api";
import "./CSS/signup.css";
import "../pics/formimg.jpg";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const handleSubmit = async (e) => {e.preventDefault();
    try {
      const user = { name, email, password };
      const response = await signup(user);
      localStorage.setItem("token", response.data.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
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
         <Link to="/Login">
        <button type="submit">Sign up</button>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
