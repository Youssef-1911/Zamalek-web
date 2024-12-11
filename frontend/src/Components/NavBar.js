import React from "react";
import "./NavBar";
const NavBar = ({ navigate }) => {
    return (
        <nav>
            <div className="logo" onClick={() => navigate("home")}>
                <img src="" alt="Zamalek SC Logo" />
                
            </div>
            <div className="nav-center">
                <h1>Zamalek SC</h1> 
            </div>
            <div>
                <ul>
                    <li onClick={() => navigate("login")}>Login</li>
                    <li onClick={() => navigate("register")}>Register</li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar 