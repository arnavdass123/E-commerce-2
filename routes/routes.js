// all web routes is here
const homecontroller = require("../app/http/controllers/homecontrollers");
const cartcontroller = require("../app/http/controllers/costomers/cartcontrollers");
const authcontroller = require("../app/http/controllers/authcontrollers");
const ordercontroller = require("../app/http/controllers/costomers/ordercontrollers");
const adminOrdercontroller = require("../app/http/admin/adminodercontroller");
const uploadcontroller = require("../app/http/controllers/uploadcontroller");
const guest = require("../app/http/middleware/guest");
const auth = require("../app/http/middleware/auth");

function initroutes(app) {
  app.get("/", homecontroller().index);

  app.get("/upload", uploadcontroller().index);
  app.post("/upload", uploadcontroller().postindex);

  app.get("/login", authcontroller().login);
  app.post("/login", authcontroller().PostLogin);

  app.get("/register", guest, authcontroller().register);
  app.post("/register", authcontroller().postregister);

  app.post("/logout", authcontroller().logout);

  app.get("/cart", cartcontroller().index);
  app.post("/update-cart", cartcontroller().update);

  // costomer routes
  app.post("/order", auth, ordercontroller().store);
  app.get("/costomers/order", auth, ordercontroller().index);

  // admin routes:
  app.get("/admin/orders", adminOrdercontroller().index);
}

module.exports = initroutes;
