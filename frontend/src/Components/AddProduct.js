import React, { useState } from 'react';

const AddProduct = () => {
  const [name, setname] = useState('');
  const [description, setdescription] = useState('');
  const [price, setprice] = useState('');
  const [quantity, setquantity] = useState('');
  const [photo,setphoto] = useState('')
  const [message, setMessage] = useState(''); 

  const AddProduct = () => {
    fetch('http://localhost:1911/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name,description,price,quantity,photo}), 
      credentials:"include"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to add Product. status code ${response.status}, message
          ${JSON.stringify(response.text())}`);
      }
      setMessage('Product added successfully');
      alert('Product added successfully'); 
    })
    .catch((error) => {
      setMessage(`Error: ${error.message}`); 
      alert(error.message); 
    });
  };
  return (
    <div className="form-section">
      <h2>Add Products</h2>
      <form>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setname(e.target.value)} 
          required 
        /><br />
        <input 
          type="text" 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setdescription(e.target.value)} 
          required 
        /><br />
        <input 
          type="text" 
          placeholder='Price'
          value={price} 
          onChange={(e) => setprice(e.target.value)} 
          required 
        /><br />
        <input 
          type="intger" 
          placeholder="Quantity" 
          value={quantity} 
          onChange={(e) => setquantity(e.target.value)} 
          required 
        /><br />
        <input
        type="text"
        placeholder="photo"
        value={photo}
        onChange={(e)=> setphoto(e.target.value)}
        required
        /><br/>
        <button type="button" onClick={AddProduct}>Add Product</button>
      </form>
      {message && <p>{message}</p>} 
    </div>
  );
};

export default AddProduct;