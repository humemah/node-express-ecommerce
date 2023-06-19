// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4001;
require('dotenv').config()
console.log("hello")
// Connect to MongoDB
mongoose.connect(process.env.mongoDB, {
  useNewUrlParser: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB', error);
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});


app.listen(port,()=>{
    console.log("server running")
})

// // Parse JSON bodies for POST and PUT requests
app.use(express.json());

const storeRoute = require('./routes/productRoutes')
app.use('/storeRoutes',storeRoute)
const UserRoute = require('./routes/UserRoutes')
app.use('/user',UserRoute)

const CartRoute = require('./routes/CartRoutes')
app.use('/carts',CartRoute)




