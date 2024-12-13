import React from "react";
import "./UserPage.css"
import"./Store"
import "./Teamsquad"
import "./Viewcart"

const UserPage = ({ navigate }) => {
    return (
      <div className="User-page">
        <h1>في الكورفا سود جمهور اسود</h1>
        <div className="User-actions">
          <button onClick={()=>navigate("store-products")}>Club Store</button> <br/>
          <button onClick={()=> navigate("view-players")}>View Team Squad</button> <br/>
          <button onClick={() => navigate("view-cart")}>View Your Cart</button> <br/>
          <button onClick={() => navigate("view-whishlist")}>View Your Whishlist</button> <br/>
        </div>
      </div>
    );
  };
  
  export default UserPage;
  
  
