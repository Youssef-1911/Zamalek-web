
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

  const addToCart = (productId) => {
    const userId = 7; // Replace with dynamic user ID if available
    fetch("http://localhost:1911/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId, quantity: 1 }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Product added to cart!");
        } else {
          console.error("Failed to add product to cart");
        }
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  };

  const addToWishlist = (productId) => {
    const userId = 7; // 
    fetch("http://localhost:1911/wishlist/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Product added to wishlist!");
        } else {
          console.error("Failed to add product to wishlist");
        }
      })
      .catch((error) => {
        console.error("Error adding product to wishlist:", error);
      });
  };


  return (
    <div>
      <h1>Club Store</h1>
      <ul>
        {products.map((product) => (
          <li key={product.ID}>
            <strong>Name:</strong> {product.NAME} <br />
            <strong>Description:</strong> {product.DESCRIPTION} <br />
            <strong>Price:</strong> ${product.PRICE} <br />
            <button onClick={() => addToCart(product.ID)}>Add to Cart</button>
            <button onClick={() => addToWishlist(product.ID)}>Add to Wishlist</button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('user-page')}>Back to Fan page</button>
    </div>
  );
};

export default ViewProduct;