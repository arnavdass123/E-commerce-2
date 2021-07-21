"use strict";

// import modules:
require("dotenv").config();

var express = require("express");

var app = express();

var ejs = require("ejs");

var expresslayout = require("express-ejs-layouts");

var path = require("path");

var port = process.env.port || 80;

var mongoose = require('mongoose');

var session = require('express-session');

var flash = require('express-flash');

var Mongodbstore = require('connect-mongo')(session); // database connection:


var url = 'mongodb://localhost/zip';
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true
});
var connection = mongoose.connection;
connection.once('open', function () {
  console.log("database connected...");
})["catch"](function (err) {
  console.log("connection failed");
}); // session store:

var mongostore = new Mongodbstore({
  mongooseConnection: connection,
  collection: 'sessions'
}); // session config

app.use(session({
  secret: process.env.COOKIES_SECRET,
  resave: false,
  saveUninitialized: false,
  store: mongostore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));
app.use(flash()); // assets:

app.use(express["static"]('dist'));
app.use(express.json());
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});
app.use(expresslayout); // app.set('views', './views/home.ejs')

app.set('view engine', 'ejs');
app.set("/views", path.join(__dirname, "veiws")); // connect with file
// rendering page:

require('./routes')(app); // prot listening:


app.listen(port, function () {
  console.log("listing on port", port);
});