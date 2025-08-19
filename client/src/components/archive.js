import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

export default function ArchivedOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchArchivedOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:5050/api/get-archived-orders", {
        headers: { Auth: token },
      });
      setOrders(res.data || []);
    } catch (err) {
      console.error("fetchArchivedOrders error:", err.response?.data || err.message);
      alert("Error fetching archived orders. Check server logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchivedOrders();
  }, []);

  return (
    <>
      <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
        Archived Orders
      </Typography>

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
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No archived orders 
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.user?.username || order.user?.email || "—"}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </>
  );
}


