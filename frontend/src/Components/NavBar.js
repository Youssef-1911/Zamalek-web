import React from "react";
import "./NavBar.css";
const NavBar = ({ navigate }) => {
    return (
        <nav>
              <button onClick={() => navigate('home')}> Home page</button>
         
          <div className="nav-center">
                <h1>Zamalek SC</h1> 
                <h2>اكبر قلعة رياضية في مصر</h2>
            </div>
            <div>
                    <button onClick={() => navigate("login")}>Login</button>
                    <button onClick={() => navigate("register")}>Register</button>
            </div>
        </nav>
    );
};

export default NavBar 