import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';

export default function MainDash() {
  const [allUsers, setAllUsers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [userState, setUserState] = useState([]);
  const [orderState, setOrderState] = useState([]);
  const [productState, setProductState] = useState([]);

  useEffect(() => {
    fetchAllUsers();
    fetchAllOrders();
    fetchAllProducts();
  }, []);

  
  const generateStatus = (items, setState, dateField = "createdAt") => {
    const today = new Date();
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      return date.toISOString().slice(0, 10);
    }).reverse();

    const state = last7Days.map((date) => {
      const count = items.filter((item) =>
        item[dateField]?.startsWith(date)
      ).length;
      return { date, count };
    });

    setState(state);
    console.log("state:", state);
  };

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5050/api/users", {
        headers: {
          "Content-Type": "application/json",
          Auth: `${localStorage.getItem("token")}`,
        },
      });
      setAllUsers(res.data);
      generateStatus(res.data, setUserState, "createdAt");
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };

  const fetchAllOrders = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5050/api/get-all-orders", {
        headers: {
          "Content-Type": "application/json",
          Auth: `${localStorage.getItem("token")}`,
        },
      });
      setAllOrders(res.data);
      generateStatus(res.data, setOrderState, "createdAt");
    } catch (error) {
      console.error("Error fetching Orders:", error);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5050/api/products", {
        headers: {
          "Content-Type": "application/json",
          Auth: `${localStorage.getItem("token")}`,
        },
      });
      setAllProducts(res.data);
      generateStatus(res.data, setProductState, "createdAt");
    } catch (error) {
      console.error("Error fetching Products:", error);
    }
  };

 
  const valueFormatter = (value) =>
    value != null ? value.toLocaleString() : "0";

  return (
    <>
      <h1>Main Dashboard</h1>

      <h2>Users (Last 7 days)</h2>
      <BarChart
        dataset={userState}
        xAxis={[{ scaleType: "band", dataKey: "date", label: "Date" }]}
        series={[{ dataKey: "count", label: "User Count", valueFormatter }]}
        width={600}
        height={300}
      />

      
      <h2>Products (Last 7 days)</h2>
      <BarChart
        dataset={productState}
        xAxis={[{ scaleType: "band", dataKey: "date", label: "Date" }]}
        series={[{ dataKey: "count", label: "Product Count", valueFormatter }]}
        width={600}
        height={300}
      />

      <h2>Orders (Last 7 days)</h2>
      <BarChart
        dataset={orderState}
        xAxis={[{ scaleType: "band", dataKey: "date", label: "Date" }]}
        series={[{ dataKey: "count", label: "Order Count", valueFormatter }]}
        width={600}
        height={300}
      />

    </>
  );
}
