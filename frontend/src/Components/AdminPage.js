import React from "react";
import "./AdminPage.css";
import "./AddPlayer";
import "./AddProduct"
import "./DeletePlayer"
import "./ViewProduct"


const AdminPage = ({ navigate }) => {
  return (
    <div className="admin-page">
      <h1>Zamalek Sc Admin Page</h1>
      <p>Select an action below:</p>
      <div className="admin-actions">
        <button onClick={()=>navigate("view-Users")}>View Users</button>
        <button onClick={()=> navigate("add-player")}>Add Player</button>
        <button onClick={() => navigate("delete-player")}>Delete player</button>
        <button onClick={()=> navigate("view-products")}>View Products</button>
        <button onClick={()=> navigate("add-product")}>Add Product</button>
        <button onClick={() => navigate("update-product")}>Update Product</button>
        <button onClick={()=> navigate("delete-product")}>Delete Product</button>
        <button onClick={() => navigate("view-orders")}>View Orders</button>
        <button onClick={() => navigate("update-order")}>Update Order status</button>
      </div>
    </div>
  );
};

export default AdminPage;


