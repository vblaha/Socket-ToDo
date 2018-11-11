// Imports express into our app and sets it up for use
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose");

const http = require('http').Server(app);
const io = require('socket.io')(http);

// Defines a PORT for the server to listen for requests
const PORT = process.env.PORT || 3000;

// Sets up our server to parse our request body for usage
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sets our server to use the public directory for static assets
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// -----------------mongodb://<dbuser>:<dbpassword>@ds121203.mlab.com:21203/heroku_2z7j0jbv
// mongoose.connect("mongodb://test2:lab_2018A@ds121203.mlab.com:21203/heroku_2z7j0jbv", { useNewUrlParser: true });
mongoose.connect('mongodb://localhost:27017/tododb')
require('./routes/api-routes.js')(app, io);
require('./routes/html-routes.js')(app);

// Starts our server on the predefined PORT
http.listen(PORT, function(){
  console.log(`App is running: http://localhost:${PORT}`)
})