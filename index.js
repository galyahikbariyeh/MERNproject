const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const adminRouter = require('./routers/userRoutes');




dotenv.config();
connectDB()
const cors=require('cors');
const app = express();
app.use(cors(
   {origin:'http://localhost:3000'} 
))


app.use(express.json())
app.use('/api',adminRouter)




const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log('Server is running on port ${PORT}'))
