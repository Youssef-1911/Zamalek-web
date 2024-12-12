import React, { useState, useEffect } from 'react';



const Vieworders = () => {
  const [orders, setorders] = useState([]);

  const Vieworders = () => {
    fetch('http://localhost:1911/orders/view')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch orders');
          return [];
        }
      })
      .then((data) => {
        setorders(data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  };

  useEffect(() => {
    Vieworders();
  }, []);

  return (
    <div>
      <h1>View All Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.ID}>
            <strong>Order ID:</strong> {order.ID} <br />
            <strong>User ID:</strong> {order.USER_ID} <br />
            <strong>Product ID :</strong>{order.PRODUCT_ID}<br/>
            <strong>Quantity:</strong> {order.QUANTITY}<br />
            <strong>Total Price:</strong>{order.TOTAL_PRICE} <br />
            <strong>Username:</strong>{order.NAME}<br/>
            <strong>ADDRESS:</strong>{order.ADDRESS}<br/>
            <strong>PAYMENT_METHOD:</strong>{order.PAYMENT_METHOD}<br/>
            <strong>Order status:</strong>{order.STATUS}<br/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Vieworders;