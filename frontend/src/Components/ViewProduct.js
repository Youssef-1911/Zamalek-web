import React, { useState, useEffect } from 'react';



const ViewProduct = () => {
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
      <ul>
        {products.map((product) => (
          <li key={product.ID}>
            <strong>Name:</strong> {product.NAME} <br />
            <strong>Description:</strong> {product.DESCRIPTION} <br />
            <strong>Price:</strong> ${product.PRICE} <br />
            <strong>Quantity:</strong> {product.QUANTITY}<br /> 
            <strong>Product ID :</strong>{product.ID}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewProduct;

