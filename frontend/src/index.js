import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './Components/Main'
import reportWebVitals from './reportWebVitals';
import './Components/LoginForm.css'
import './Components/Home.css'
import './Components/NavBar.css'
import './Components/RegistrationForm.css'
import './Components/AdminPage.css'
import'./Components/UserPage.css'
import './Components/Store.css'





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
