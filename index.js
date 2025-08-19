const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const adminRouter = require('./routers/userRoutes');
const productRouter=require('./routers/productsRoutes');

const categoryRouters = require('./routers/categoryRouters');
const cartRoutes=require('./routers/cartRouters');
const orderRoutes=require('./routers/ordersRouters');
const favoriteRoutes = require("./routers/favRouters");

dotenv.config();
connectDB()
const cors=require('cors');
const app = express();
app.use(cors(
   {origin:'http://localhost:3000'} 
))

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json())
app.use('/api',adminRouter)
app.use('/api',productRouter)
app.use('/api',categoryRouters)
app.use('/api',cartRoutes)
app.use('/api',orderRoutes)


app.use("/api", favoriteRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log('Server is running on port ${PORT}'))
