import React, { useState } from 'react';

const DeleteProduct = ({navigate}) => {
  const [productId, setproductId] = useState('');
  const [message, setMessage] = useState(''); 

  const DeleteProduct = () => {
    fetch(`http://localhost:1911/delete/product/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({productId}), 
      credentials:"include"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to delete Product. status code ${response.status}, message
          ${JSON.stringify(response.text())}`);
      }
      setMessage('Product deleted successfully');
      alert('Product deleted successfully'); 
    })
    .catch((error) => {
      setMessage(`Error: ${error.message}`); 
      alert(error.message); 
    });
  };
  return (
    <div className="form-section">
      <h2>Delete Products</h2>
      <form>
        <input 
          type="text" 
          placeholder="Product ID" 
          value={productId}
          onChange={(e) => setproductId(e.target.value)} 
          required 
        /><br />
        <button type="button" onClick={DeleteProduct}>Delete Player</button>
      </form>
      {message && <p>{message}</p>} 
      <button onClick={() => navigate('admin-page')}>Back to Admin page</button>
    </div>
  );
};

export default DeleteProduct;