import React from "react";
import "./LoginForm.css";

const LoginForm = ({ navigate }) => {
  let email = "";
  let password = "";
  let message = "";

  const loginUser = () => {
    fetch("http://localhost:1911/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid credentials");
        }
        return response.json();
      })
      .then((userData) => {
        if (userData.admin === 1) {
          navigate("admin-page");
        } else {
          navigate("home");
        }
      })
      .catch((error) => {
        message = error.message;
        alert(message);
      });
  };

  return (
    <div className="form-section">
      <h3>User Login</h3>
      <form>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => (email = e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => (password = e.target.value)}
          required
        />
        <br />
        <button type="button" onClick={loginUser}>
          Login
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default LoginForm;
