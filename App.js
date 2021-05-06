const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const postRoute = require('./Routes/post');
const authRoute = require('./Routes/auth');
const helmet= require('helmet');
const compression = require('compression');
const cartRoute= require('./Routes/cart');
const app = express();

//Middleware
app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(bodyParser.json());
app.use('/notification', postRoute);
app.use('/auth', authRoute);
app.use('/cart',cartRoute);
app.use(helmet());
app.use(compression());

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });
  
   mongoose
    .connect(
        'mongodb://127.0.0.1:27017/test',{
          useNewUrlParser: true,
          autoCreate: true
        } 
    )
    .then(result => {
      app.listen(8080);
    })
    .catch(err => console.log(err));