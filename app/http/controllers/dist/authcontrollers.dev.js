"use strict";

function authcontroller() {
  return {
    login: function login(req, res) {
      res.render('auth/login');
    },
    register: function register(req, res) {
      res.render('auth/register');
    }
  };
}

module.exports = authcontroller;