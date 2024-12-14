import React, { useState, useEffect } from "react";
import "./Viewcart.css"

const CartView = ({navigate}) => {
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const userId = 7; 

  const fetchCartItems = () => {
    fetch(`http://localhost:1911/cart/user/${userId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Failed to fetch cart items");
          return [];
        }
      })
      .then((data) => setCartItems(data))
      .catch((error) => console.error("Error fetching cart items:", error));
  };

 
  const removeFromCart = (productId) => {
    fetch(`http://localhost:1911/cart/remove/${userId}/${productId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert("Item removed from cart");
          fetchCartItems();
        } else {
          console.error("Failed to remove item from cart");
        }
      })
      .catch((error) => console.error("Error removing item from cart:", error));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      alert("Quantity must be at least 1");
      return;
    }
    fetch("http://localhost:1911/cart/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId, quantity }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Quantity updated");
          fetchCartItems(); 
        } else {
          console.error("Failed to update quantity");
        }
      })
      .catch((error) => console.error("Error updating quantity:", error));
  };

 
  const placeOrder = (e) => {
    e.preventDefault();

    if (!name || !address || !paymentMethod) {
      alert("Please fill in all the fields to place your order.");
      return;
    }

    fetch("http://localhost:1911/order/from-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, name, address, paymentMethod }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Order placed successfully!");
          fetchCartItems();
          setName("");
          setAddress("");
          setPaymentMethod("");
        } else {
          response.text().then((message) => {
            console.error("Failed to place order:", message);
            alert(`Failed to place order: ${message}`);
          });
        }
      })
      .catch((error) => console.error("Error placing order:", error));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.QUANTITY * item.PRICE);
    }, 0).toFixed(2);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="cart-container">
      <h1>My Cart</h1>
      {cartItems.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.PRODUCT_ID}>
                  <td>{item.PRODUCT_NAME}</td>
                  <td>
                    <input
                      type="number"
                      value={item.QUANTITY}
                      onChange={(e) =>
                        updateQuantity(item.PRODUCT_ID, parseInt(e.target.value))
                      }
                    />
                  </td>
                  <td>${item.PRICE}</td>
                  <td>${(item.QUANTITY * item.PRICE).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.PRODUCT_ID)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
          <div className="order-total">
            <h3>Total Order Price: ${calculateTotal()}</h3>
          </div>

          <h2>Place Your Order</h2>
          <form onSubmit={placeOrder}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Address:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Payment Method:</label>
              <input
                type="text"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              />
            </div>
            <button type="submit" >
              Place Order
            </button>
          </form>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
       <button onClick={() => navigate('user-page')}>Back to Fan page</button>
    </div>
  );
};

export default CartView;



