import React, { useState, useEffect } from 'react';




const ViewProduct = ({navigate}) => {
  const [products, setProducts] = useState([]);

  const ViewProduct = () => {
    fetch('http://localhost:1911/product/view')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch Products');
          return [];
        }
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching Products:', error);
      });
  };

  useEffect(() => {
    ViewProduct();
  }, []);
    return (
      <div>
        <h1>View All Products</h1>
        <div>
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.ID}>
                  <td>{product.ID}</td>
                  <td>{product.NAME}</td>
                  <td>{product.DESCRIPTION}</td>
                  <td>${product.PRICE}</td>
                  <td>{product.QUANTITY}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="back-button" onClick={() => navigate('admin-page')}>
          Back to Admin page
        </button>
      </div>
    );
  };

export default ViewProduct;

