import React from 'react';
import './RegistrationForm.css';
const RegistrationForm = () => {
  let name = '';
  let email = '';
  let password = '';
  let isAdmin = false;
  let message = '';
  const registerUser = () => {
    fetch('http://localhost:1911/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, isAdmin }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Registration failed');
        }
        message = 'Registration successful';
        alert(message); 
      })
      .catch((error) => {
        message = error.message;
        alert(message); 
      });
  };
  return (
    <div className="form-section">
      <h3>User Registration</h3>
      <form>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => (name = e.target.value)} 
          required
        />
        <br />
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
        <button type="button" onClick={registerUser}>
          Register
        </button>
      </form>
      <p>{message}</p> 
    </div>
  );
};

export default RegistrationForm;