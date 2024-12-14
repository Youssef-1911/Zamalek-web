import React, { useState, useEffect } from "react";
import "./ViewWhishlist.css"

const Wishlist = ({navigate}) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const userId = 7;


  const fetchWishlistItems = () => {
    fetch(`http://localhost:1911/wishlist/user/${userId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Failed to fetch wishlist items");
          return [];
        }
      })
      .then((data) => setWishlistItems(data))
      .catch((error) => console.error("Error fetching wishlist items:", error));
  };


  const removeFromWishlist = (productId) => {
    fetch(`http://localhost:1911/wishlist/remove/${userId}/${productId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert("Item removed from wishlist");
          fetchWishlistItems(); 
        } else {
          console.error("Failed to remove item from wishlist");
        }
      })
      .catch((error) => console.error("Error removing item from wishlist:", error));
  };


  const addToCartFromWishlist = (productId) => {
    fetch("http://localhost:1911/wishlist/add-to-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Item added to cart successfully");
          fetchWishlistItems(); 
        } else {
          console.error("Failed to add item to cart");
        }
      })
      .catch((error) => console.error("Error adding item to cart:", error));
  };

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  return (
    <div >
      <h1>My Wishlist</h1>
      {wishlistItems.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Description</th>
              <th>Product Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map((item) => (
              <tr key={item.PRODUCT_ID}>
                 <td>{item.NAME}</td>
      <td>{item.DESCRIPTION}</td>
      <td>${item.PRICE}</td>
              <td>
                  <button onClick={() => removeFromWishlist(item.PRODUCT_ID)}>
                    Remove
                  </button>
                  <button onClick={() => addToCartFromWishlist(item.PRODUCT_ID)}>
                    Add to Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
       <button onClick={() => navigate('user-page')}>Back to Fan page</button>
    </div>
  );
};

export default Wishlist;
