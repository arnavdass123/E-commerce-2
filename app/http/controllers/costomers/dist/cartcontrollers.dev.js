"use strict";

function cartcontroller() {
  return {
    index: function index(req, res) {
      res.render("costomers/cart");
    },
    update: function update(req, res) {
      // for the first time creating cart:
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalqty: 0,
          totalprice: 0
        };
      }

      var cart = req.session.cart; // check if items doesnot exits in cart:

      if (!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
          items: req.body,
          qty: 1
        };
        cart.totalqty = cart.totalqty + 1;
        cart.totalprice = cart.totalprice + req.body.price;
      } else {
        cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
        cart.totalqty = cart.totalqty + 1;
        cart.totalprice = cart.totalprice + req.body.price;
      }

      return res.json({
        totalqty: req.session.cart.totalqty
      });
    }
  };
}

module.exports = cartcontroller;