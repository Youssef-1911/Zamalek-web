import React, { useState, useEffect } from "react";
import './Myorders.css'
const ViewOrderHistory = ({navigate}) => {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const userId = 7; 

  
  const fetchOrderHistory = () => {
    fetch(`http://localhost:1911/orders/history/${userId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then((message) => {
            throw new Error(message);
          });
        }
      })
      .then((data) => {
        setOrders(data);
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setOrders([]);
      });
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  return (
    <div className="my-order">
      <h1>Order History</h1>
      {errorMessage}
  
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Name</th>
              <th>Address</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.ID}>
                <td>{order.ID}</td>
                <td>{order.PRODUCT_ID}</td>
                <td>{order.QUANTITY}</td>
                <td>${order.TOTAL_PRICE}</td>
                <td>{order.NAME}</td>
                <td>{order.ADDRESS}</td>
                <td>{order.PAYMENT_METHOD}</td>
                <td>{order.STATUS}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => navigate('user-page')}>Back to Fan page</button>

    </div>
  );
};

export default ViewOrderHistory;
