"use strict";

// all web routes is here
var homecontroller = require('../app/http/controllers/homecontrollers');

var cartcontroller = require('../app/http/controllers/costomers/cartcontrollers');

var authcontroller = require('../app/http/controllers/authcontrollers');

function initroutes(app) {
  app.get("/", homecontroller().index);
  app.get("/login", authcontroller().login);
  app.get("/register", authcontroller().register);
  app.get("/cart", cartcontroller().index);
  app.post("/update-cart", cartcontroller().update);
}

module.exports = initroutes;