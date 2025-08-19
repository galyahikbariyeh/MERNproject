import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Modal, Box, Typography, Button
} from '@mui/material';
import Navbar from "./navBar";
import Footer from "./footer";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [open, setOpen] = useState(false); 

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5050/api/get-all-orders', {
        headers: {
          'Content-Type': 'application/json',
          'Auth': `${localStorage.getItem('token')}`
        }
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <Navbar/>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>All Orders</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Show order</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                
               
                <TableCell>{order.user ? order.user.username : "Unknown User"}</TableCell>
                
                <TableCell>{order.total}</TableCell>
                <TableCell>
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item) => (
                      <div key={item.product?._id || item._id}>
                        {item.product ? item.product.name : "Unknown Product"} (x{item.quantity})
                      </div>
                    ))
                  ) : (
                    <div>No items</div>
                  )}
                </TableCell>
                <TableCell>{order.status || "Pending"}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(order)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 400 }, bgcolor: 'background.paper',
          border: '2px solid #000', boxShadow: 24, p: 4, maxHeight: '80vh', overflowY: 'auto'
        }}>
          <Typography variant="h6" component="h2">Order Details</Typography>
          {selectedOrder && (
            <>
              <Typography sx={{ mt: 2 }}>Order ID: {selectedOrder._id}</Typography>
              <Typography>Customer: {selectedOrder.user ? selectedOrder.user.username : "Unknown"}</Typography>
              <Typography>Total: {selectedOrder.total}</Typography>
              <Typography>Status: {selectedOrder.status || "Pending"}</Typography>
              <Typography sx={{ mt: 2 }}>Items:</Typography>
              <Box>
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  selectedOrder.items.map((item) => (
                    <Box key={item.product?._id || item._id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ width: 80, height: 80, mr: 2 }}>
                        {item.product?.image ? (
                          <img 
                            src={`http://127.0.0.1:5050/uploads/${item.product.image}`} 
                            alt={item.product.name} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }} 
                          />
                        ) : (
                          <Box sx={{ width: '100%', height: '100%', bgcolor: '#eee', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="caption">No Image</Typography>
                          </Box>
                        )}
                      </Box>
                      <Box>
                        <Typography>{item.product ? item.product.name : "Unknown Product"} (x{item.quantity})</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.product?.description || "No description"}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography>No items available</Typography>
                )}
              </Box>
              <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>Close</Button>
            </>
          )}
        </Box>
      </Modal>

     
    </>
  );
};

export default Orders;
