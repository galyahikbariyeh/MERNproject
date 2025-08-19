import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:5050/api/get-all-orders", {
        headers: { Auth: token },
      });
      setOrders(res.data || []);
    } catch (err) {
      console.error("fetchOrders error:", err.response?.data || err.message);
      alert("Error fetching orders. Check server logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    
  }, []);

  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedOrder(null);
    setOpen(false);
  };

 
  const archiveOrder = async (id) => {
    if (!window.confirm("Are you sure you want to archive this order?")) return;
    try {
      await axios.put(`http://127.0.0.1:5050/api/archiveOrder/${id}`, {}, {
        headers: { Auth: token },
      });
     
      setOrders((prev) => prev.map(o => (o._id === id ? { ...o, archived: true } : o)));
      alert("Order archived successfully");
    } catch (err) {
      console.error("archiveOrder error:", err.response?.data || err.message);
      alert("Error archiving order");
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 600 },
    maxHeight: "80vh",
    overflowY: "auto",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
  };

  return (
    <>
    {/* <Button
  variant="contained"
  color="secondary"
  href="/arch"
  sx={{ mt: 2 }}
>
  View Archived Orders
</Button> */}

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>All Orders</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Archived</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.user?.username || order.user?.email || "—"}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>
                      {order.items?.map((item) => (
                        <div key={item.product?._id}>
                          {item.product?.name} (x{item.quantity})
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.archived ? "YES" : "NO"}</TableCell>

                    <TableCell>
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => handleOpen(order)}
                        sx={{ mr: 1 }}
                      >
                        View
                      </Button>

                      {!order.archived && (
                        <Button
                          variant="outlined"
                          color="warning"
                          size="small"
                          onClick={() => archiveOrder(order._id)}
                        >
                          Archive
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

     
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Order Details
          </Typography>

          {!selectedOrder ? (
            <Typography>Loading...</Typography>
          ) : (
            <>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Order ID:</strong> {selectedOrder._id}
              </Typography>
              <Typography variant="body2">
                <strong>Customer:</strong> {selectedOrder.user?.username || selectedOrder.user?.email}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Total:</strong> {selectedOrder.total}
              </Typography>
              <Typography variant="body2">
                <strong>Status:</strong> {selectedOrder.status}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Archived:</strong> {selectedOrder.archived ? "YES" : "NO"}
              </Typography>

              <Typography variant="subtitle1" sx={{ mt: 2 }}>Items:</Typography>
              {selectedOrder.items?.map((item) => (
                <Box key={item.product?._id} sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
                  <Box sx={{ width: 80, height: 80, flexShrink: 0, borderRadius: 1, overflow: "hidden", bgcolor: "#f0f0f0" }}>
                    {item.product?.image ? (
                      <img
                        src={`http://127.0.0.1:5050/uploads/${item.product.image}`}
                        alt={item.product?.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        No image
                      </Box>
                    )}
                  </Box>

                  <Box>
                    <Typography><strong>{item.product?.name}</strong> (x{item.quantity})</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.product?.description || "No description"}
                    </Typography>
                    <Typography variant="body2">Price: {item.product?.price}</Typography>
                  </Box>
                </Box>
              ))}

              <Box sx={{ textAlign: "right", mt: 2 }}>
                <Button onClick={handleClose} variant="contained">Close</Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}

