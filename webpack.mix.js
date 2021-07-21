const mix = require("laravel-mix");

mix
  .js("resources/js/app.js", "js")
  .js("resources/js/admin.js", "js")
  .sass("resources/scss/app.scss", "css")
  .setPublicPath("public");
