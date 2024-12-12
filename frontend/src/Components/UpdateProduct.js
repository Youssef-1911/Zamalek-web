import React, { useState } from 'react';

const UpdateProduct = () => {
    const [productId, setProductId] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [message, setMessage] = useState("");

  const UpdateProduct = () => {
    fetch(`http://localhost:1911/products/update/${productId}/${newPrice}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}), 
      credentials:"include"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to update product. status code ${response.status}, message
          ${JSON.stringify(response.text())}`);
      }
      setMessage('Price Updated successfully');
      alert('Price Updated successfully'); 
    })
    .catch((error) => {
      setMessage(`Error: ${error.message}`); 
      alert(error.message); 
    });
  };
  return (
    <div className="form-section">
      <h2>Update Products</h2>
      <form>
        <input 
          type="text" 
          placeholder="Nunmber" 
          value={productId} 
          onChange={(e) => setProductId(e.target.value)} 
          required 
        /><br />
        <input 
          type="number" 
          placeholder="New Price" 
          value={newPrice} 
          onChange={(e) => setNewPrice(e.target.value)} 
          required 
        /><br />
        
        <button type="button" onClick={UpdateProduct}>Update Product</button>
      </form>
      {message && <p>{message}</p>} 
    </div>
  );
};

export default UpdateProduct;