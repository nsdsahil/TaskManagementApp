import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://taskmanagementapp-hqnr.onrender.com/api/users/login", {
        email,
        password,
      });
      localStorage.setItem("authToken", data.token); 
      window.location.href = "/dashboard";
    } catch (err) {
      setLoginError("Invalid email or password. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary mb-3">Login</button>
        {loginError && <p className="text-danger">{loginError}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
