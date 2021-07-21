"use strict";

var _axios = _interopRequireDefault(require("axios"));

var _noty = _interopRequireDefault(require("noty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addTOCart = document.querySelectorAll(".add-to-cart");
var cartCounter = document.querySelector('#cartCounter');

function updateCart(zip) {
  _axios["default"].post("/update-cart", zip).then(function (res) {
    cartCounter.innerText = res.data.totalqty;
    new _noty["default"]({
      type: 'success',
      timeout: 1000,
      text: 'item added in your cart'
    }).show();
  });
}

addTOCart.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    var zip = JSON.parse(btn.dataset.zip);
    updateCart(zip);
    console.log(zip);
  });
});