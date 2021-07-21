"use strict";

var item = require('../../models/menu');

function homecontroller() {
  return {
    index: function index(req, res) {
      var zips;
      return regeneratorRuntime.async(function index$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(item.find());

            case 2:
              zips = _context.sent;
              console.log(zips);
              return _context.abrupt("return", res.render('home', {
                zips: zips
              }));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  };
}

module.exports = homecontroller;