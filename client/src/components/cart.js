import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardMedia, CardContent, CardActions, Typography, Button } from "@mui/material";
import axios from "axios";
import Navbar from "./navBar";
import Footer from "./footer";


const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/get-cart", {
        headers: {
          "Content-Type": "application/json",
          Auth: `${localStorage.getItem("token")}`,
        },
      });
      setCart(res.data.items);
      calculateTotal(res.data.items);
    } catch (err) {
      alert(err);
    }
  };

  const removeCart = (productId) => {
    axios
      .delete(`http://localhost:5050/api/remove-from-cart/${productId}`, {
        headers: {
          "Content-Type": "application/json",
          Auth: `${localStorage.getItem("token")}`,
        },
      })
      .then(() => setCart(cart.filter((item) => item.product._id !== productId)))
      .catch((err) => alert(err));
  };

  const calculateTotal = (data) => {
    if (!Array.isArray(data)) {
      setTotal(0);
      return;
    }
    const newTotal = data.reduce((sum, item) => sum + parseInt(item.product.price) * item.quantity, 0);
    setTotal(newTotal);
  };

  const placeOrder = () => {
    axios.post(
        "http://localhost:5050/api/place-order",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Auth: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        alert("Order placed successfully");
        setCart([]);
        setTotal(0);
      })
      .catch((err) => alert(err));
  };

  return (
    <>
    <Navbar/>
    <Box sx={{ p: { xs: 2, sm: 5 }, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center", fontWeight: "bold", color: "#1976d2" }}>
        Cart
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {cart && cart.length > 0 ? (
          cart.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.product._id}>
              <Card sx={{ maxWidth: 345, mx: "auto", bgcolor: "#fff", boxShadow: 3 }}>
                <CardMedia
                  sx={{ height: 180 }}
                  image={`http://127.0.0.1:5050/uploads/${item.product.image}`}
                  title={item.product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                    {item.product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.product.description}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    Price: {item.product.price}JD
                  </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
                  <Typography variant="body2">Qty: {item.quantity}</Typography>
                  <Button onClick={() => removeCart(item.product._id)} size="small" color="error" variant="outlined">
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", width: "100%", mt: 4 }}>
            No items in the cart
          </Typography>
        )}
      </Grid>

      {cart && cart.length > 0 && (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Total: <strong>{total}JD</strong>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={placeOrder}
            sx={{ px: 5, py: 1.5, fontWeight: "bold" }}
          >
            Place Order
          </Button>
        </Box>
      )}
    </Box>
    <Footer/>
    </>
  );
};

export default Cart;
