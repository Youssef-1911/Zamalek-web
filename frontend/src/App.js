import React, { useState } from "react";
import "./Homepage.css";

const Homepage = () => {
  const [activeTab, setActiveTab] = useState("signin");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");


  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:1911/user/login", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
      credentials:"include"
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMessage("Login successful!");
        } else {
          setMessage(data.message || "Login failed.");
        }
      })
      .catch(() => setMessage("An error occurred during login."));
  };

  
  const handleRegister = (e) => {
    e.preventDefault();
    fetch("http://localhost:1911/user/register", {  
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMessage("Registration successful!");
        } else {
          setMessage(data.message || "Registration failed.");
        }
      })
      .catch(() => setMessage("An error occurred during registration."));
  };

  return (
    
    <div className="homepage">
      <header className="header">
        <div className="header-box">
          <h1>Zamalek SC</h1>
          <p>Home of the white nights</p>
        </div>
      </header>

      <div className="auth-container">
        <div className="auth-tabs">
          <button
            className={`tab ${activeTab === "signin" ? "active" : ""}`}
            onClick={() => setActiveTab("signin")}
          >
            SIGN IN
          </button>
          <button
            className={`tab ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            REGISTER
          </button>
        </div>

        {activeTab === "signin" ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email Address"
              className="input-field"
              value={loginData.email}
              onChange={(e) =>
                ({email: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={loginData.password}
              onChange={(e) =>
                ({ password: e.target.value })
              }
              required
            />
            <button className="btn-primary" type="submit">
              SIGN IN
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              className="input-field"
              value={registerData.name}
              onChange={(e) =>
                setRegisterData({ ...registerData, name: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              className="input-field"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
              required
            />
            <button className="btn-primary" type="submit">
              REGISTER
            </button>
          </form>
        )}
      </div>

      {message && <div className="message">{message}</div>}

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>Zamalek Sporting Club, founded in 1911, اكبر قلعة رياضيه في مصر.</p>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: Zamalek@zamaleksc.com</p>
            <p>Phone: 1911</p>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#facebook">Facebook</a>
              <a href="#twitter">Twitter</a>
              <a href="#instagram">Instagram</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p> Zamalek SC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;

