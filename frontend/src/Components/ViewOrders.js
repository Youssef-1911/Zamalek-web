import React, { useState, useEffect } from 'react';



const Vieworders = ({navigate}) => {
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
      <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Username</th>
              <th>Address</th>
              <th>Payment Method</th>
              <th>Order Status</th>
            </tr>
            </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.ID}>
                <td>{order.ID}</td>
                <td>{order.USER_ID}</td>
                <td>{order.PRODUCT_ID}</td>
                <td>{order.QUANTITY}</td>
                <td>{order.TOTAL_PRICE}</td>
                <td>{order.NAME}</td>
                <td>{order.ADDRESS}</td>
                <td>{order.PAYMENT_METHOD}</td>
                <td>{order.STATUS}</td>
              </tr>
            ))}
          </tbody>
        </table>
          <button onClick={() => navigate('admin-page')}>Back to Admin page</button>
    </div>
  );
};

export default Vieworders;