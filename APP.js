const express= require('express')
db_access = require('./db.js')
const db = db_access.db
const app = express()
const port = 1911;
app.use(express.json())
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const secret_key= 'Zam1911lekbest'
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(cookieParser())
const generateToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, secret_key, { expiresIn: '1h' })
}
const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken
    if (!token)
        return res.status(401).send('unauthorized')
    jwt.verify(token, secret_key, (err, details) => {
        if (err)
            return res.status(403).send('invalid or expired token')
        req.userDetails = details

        next()
    })
}
app.post('/user/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const isAdmin = req.body.isAdmin;
    let hashedPassword= bcrypt.hash(password, 8, (err, hashedPassword) => {
        if (err) {
            console.log('Error hashing password:', err);
            return res.status(500).send('Error hashing password');
        }

       
        const query = `INSERT INTO USER (name, email, password, isadmin) VALUES (?, ?, ?, ?)`;
        
        db.run(query, [name, email, hashedPassword, isAdmin], (err) => {
            if (err) {
                console.log('Database error:', err);
                return res.status(500).send('Error saving user to database');
            }
            return res.status(200).send('Registration successful');
        });
    });
});


app.post("/user/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

  
    db.get(`SELECT * FROM USER WHERE EMAIL = ?`, [email], (err, row) => {
        if (err || !row) {
            return res.status(401).send("Error Logging In");
        }

     
        bcrypt.compare(password, row.PASSWORD, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(401).send("Wrong Username or Password");
            }
            else {
                let userID = row.ID
                let isAdmin = row.ISADMIN
                const token = generateToken(userID, isAdmin)

                res.cookie('authToken', token, {
                    httpOnly: true,
                    sameSite: 'none',
                    secure:true,
                    expiresIn: '1h'
                })
                return res.status(200).json({ id: userID, admin: isAdmin })
            }
        })
    })
})
app.post(`/products/add`, (req, res) => {
    let name = req.body.name;
    let description = req.body.description;
    let price = req.body.price;
    let quantity = req.body.quantity;
    let photo = req.body.photo
    let query = `INSERT INTO PRODUCT (NAME, DESCRIPTION, PRICE, QUANTITY, PHOTO) 
                 VALUES (?, ?, ?, ?,?)`;

    db.run(query, [name, description, parseFloat(price), parseInt(quantity, 10),photo], function (err) {
        if (err) {
            console.log(err);
            return res.json({ error: err.message });
        } else {
            return res.send(`Product added successfully`);
        }
    });
});
app.get(`/users/view`, (req, res) => {
    let query = `SELECT * FROM USER`; 
  
    db.all(query, (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error occurred while viewing users");
      }
      return res.status(200).json(rows); 
    });
  });

app.put(`/products/update/:id/:price`,(req, res) => {
     const productId = req.params.id;
     const newPrice = parseFloat(req.params.price);

    
    const query = `UPDATE PRODUCT SET PRICE = ? WHERE ID = ?`;

  
    db.run(query, [newPrice, productId], function (err) {
        if (err) {
            console.error(err);
            return res.status(500).send('Error updating price');
        }

        return res.status(200).send('Price Updated Successfully');
    });
});

app.get(`/product/view`, (req, res) => {
    let query = `SELECT * FROM PRODUCT`; 
  
    db.all(query, (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error occurred while viewing products");
      }
      return res.status(200).json(rows); 
    });
  });
  

app.delete('/delete/product/:id', (req, res) => {
     const productId = req.params.id;
    db.run(`DELETE FROM PRODUCT WHERE ID = ?`, [productId], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error deleting product");
        } else {
            return res.status(200).send('Product deleted successfully');
        }
    });
});
app.post("/cart/add", (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;

    let query = `INSERT INTO CART (USER_ID, PRODUCT_ID, QUANTITY) VALUES (?, ?, ?)`;

    
    db.run(query, [userId, productId, quantity], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error adding product to cart");
        } else {
            return res.status(200).send("Product added to cart successfully");
        }
    });
});
app.get("/cart/user/:userId", (req, res) => {
    const userId = req.params.userId;

    const query = `SELECT * FROM CART WHERE USER_ID = ?`;

    db.all(query, [userId], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error getting cart items");
        }
        return res.status(200).json(rows);  
    });
});


app.delete("/cart/remove/:userId/:productId",verifyToken, (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    let query = `DELETE FROM CART WHERE USER_ID = ? AND PRODUCT_ID = ?`;

    db.run(query, [userId, productId], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error removing product from cart");
        } else {
            return res.status(200).send("Product removed from cart successfully");
        }
    });
});


app.put("/cart/update",verifyToken, (req, res) => {
    const isAdmin = req.userDetails.isAdmin;
    if (isAdmin !== 1)
        return res.status(403).send("you are not an admin")
    const userId = req.body.userId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;

    let query = `UPDATE CART SET QUANTITY = ? WHERE USER_ID = ? AND PRODUCT_ID = ?`;

    db.run(query, [quantity, userId, productId], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error updating cart quantity");
        } else {
            return res.status(200).send("Cart updated successfully");
        }
    });
});
app.post("/order/from-cart", (req, res) => {
    const userId = req.body.userId; 
    const name = req.body.name;
    const address = req.body.address;
    const paymentMethod = req.body.paymentMethod;

 
    let query = `SELECT * FROM CART WHERE USER_ID = ?`;

    db.all(query, [userId], (err, cartItems) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error getting cart items");
        }

        if (!cartItems.length) {
            return res.status(404).send("Cart is empty");
        }

       
        cartItems.forEach(item => {
            let productId = item.PRODUCT_ID;
            let quantity = item.QUANTITY;

            
            let priceQuery = `SELECT PRICE FROM PRODUCT WHERE ID = ?`;
            const totalPrice =0;
            db.get(priceQuery, [productId], (err, product) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("Error fetching product details");
                }

                if (!product) {
                    return res.status(404).send("Product not found");
                }

                totalPrice = product.PRICE * quantity;

               
                let insertOrderQuery = `INSERT INTO ORDERS (USER_ID, PRODUCT_ID, QUANTITY, TOTAL_PRICE, NAME, ADDRESS, PAYMENT_METHOD) 
                                        VALUES (?, ?, ?, ?, ?, ?, ?)`;

                db.run(insertOrderQuery, [userId, productId, quantity, totalPrice, name, address, paymentMethod], (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send("Error placing order from cart");
                    }
                });
            });
        });

       
        let clearCartQuery = `DELETE FROM CART WHERE USER_ID = ?`;
        db.run(clearCartQuery, [userId], (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error clearing cart after placing order");
            }
            return res.status(200).send({message:"Order placed successfully from cart",Price:  totalPrice });
        });
    });
});
;

app.get("/orders/history/:userId", (req, res) => {
    const userId = req.params.userId;

    let query = `SELECT * FROM ORDERS WHERE USER_ID = ?`;

    db.all(query,[userId], (err, orders) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error fetching order history");
        }

        if (!orders.length) {
            return res.status(404).send("No orders found for this user");
        }

        return res.status(200).json(orders);
    });
});


app.get("/orders/view",(req, res) => {
   const query = `SELECT * FROM ORDERS`;
     db.all(query, (err,rows) => {
        if (err) {
            console.error("Error fetching order:", err.message);
            return res.status(500).send("Error fetching order");
        }

        if (!rows) {
            return res.status(404).send("Order not found");
        }

      
        return res.status(200).json(rows);
    });
});




app.put("/order/update-status", (req, res) => {
    const orderId = req.body.orderId;
    const status = req.body.status;

    let query = `UPDATE ORDERS SET STATUS = ? WHERE ID = ?`;

    db.run(query, [status, orderId], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error updating order status");
        }

        return res.status(200).send("Order status updated successfully");
    });
});

app.post("/wishlist/add", (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;

    let query = `INSERT INTO WISHLIST (USER_ID, PRODUCT_ID) VALUES ('?', '?')`;

    db.run(query,[userId,productId],(err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error adding product to wishlist");
        } else {
            return res.status(200).send("Product added to wishlist successfully");
        }
    });
});
app.get("/wishlist/user/:userId", (req, res) => {
    const userId = req.params.userId;

    let query = `SELECT * FROM WISHLIST WHERE USER_ID = ?`;

    db.all(query,[userId] ,(err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error getting wishlist items");
        }
        return res.status(200).json(rows);  
    });
});
app.delete("/wishlist/remove/:userId/:productId", (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    let query = `DELETE FROM WISHLIST WHERE USER_ID = ? AND PRODUCT_ID = ?`;

    db.run(query,[userId,productId], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error removing product from wishlist");
        } else {
            return res.status(200).send("Product removed from wishlist successfully");
        }
    });
});


app.post("/players/add",(req, res) => {
 
    const name = req.body.name;
    const position = req.body.position
    const nationality = req.body.nationality
    const bio = req.body.bio
    const photo = req.body.photo
    let query = `INSERT INTO PLAYERS (NAME, POSITION, NATIONALITY, BIO, PHOTO) 
                 VALUES (?, ?, ?, ?, ?)`;

    db.run(query,[name,position,nationality,bio,photo], function(err) {
        if (err) {
            console.log(err);
            return res.status(500).send("Error adding player");
        } 
        return res.status(200).send("Player added to successfully");
    });
});
app.delete("/players/delete/:id", (req, res) => {
    const playerId = req.params.id; 

    let query = `DELETE FROM Players WHERE ID = ? `; 

    db.run(query,[playerId], function(err) {
        if (err) {
            console.log(err);
            return res.status(500).send("Error deleting player ");
        }

        if (this.changes === 0) {
            return res.status(404).send("Player not found");
        }

        return res.status(200).send("Player deleted from successfully");
    });
});

app.get(`/player/view`, (req, res) => {
    let query = `SELECT * FROM PLAYERS`; 
  
    db.all(query, (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error occurred while viewing products");
      }
      return res.status(200).json(rows); 
    });
  });

app.listen(port,()=>{
    console.log(`App started at port ${port}`)
    db.serialize(()=>{
        db.run(db_access.createUserTable,(err)=>{
            if(err)
                console.log("error creating User Table"+err)
        });
    
        db.run(db_access.createProductTable,(err)=>{
            if(err)
                console.log("error creating product Table"+err)
        });
        db.run(db_access.createCartTable,(err)=>{
            if(err)
                console.log("error creating Cart Table"+err)
        });
        db.run(db_access.createOrdersTable,(err)=>{
            if(err)
                console.log("error creating Orders Table"+err)
        });
        db.run(db_access.createPlayersTable,(err)=>{
            if(err)
                console.log("error creating Players Table"+err)
        });

      
    })
})

