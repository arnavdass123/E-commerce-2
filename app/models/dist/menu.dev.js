"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var menuSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quality: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('item', menuSchema);