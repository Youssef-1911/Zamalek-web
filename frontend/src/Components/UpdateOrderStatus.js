import React, { useState } from 'react';

const UpdateStatus = ({navigate}) => {
    const [orderId, setorderId] = useState("");
    const [status, setstatus] = useState("");
    const [message, setMessage] = useState("");

  const UpdateStatus = () => {
    fetch(`http://localhost:1911/order/update-status/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({orderId,status}), 
      credentials:"include"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to update status. status code ${response.status}, message
          ${JSON.stringify(response.text())}`);
      }
      setMessage('Status Updated successfully');
      alert('Status Updated successfully'); 
    })
    .catch((error) => {
      setMessage(`Error: ${error.message}`); 
      alert(error.message); 
    });
  };
  return (
    <div className="form-section">
      <h2>Update Status</h2>
      <form>
        <input 
          type="text" 
          placeholder="Order ID" 
          value={orderId} 
          onChange={(e) => setorderId(e.target.value)} 
          required 
        /><br />
        <input 
          type="text" 
          placeholder="Status" 
          value={status} 
          onChange={(e) => setstatus(e.target.value)} 
          required 
        /><br />
        
        <button type="button" onClick={UpdateStatus}>Update Product</button>
      </form>
      {message && <p>{message}</p>} 
      <button onClick={() => navigate('admin-page')}>Back to Admin page</button>
    </div>
  );
};

export default UpdateStatus;