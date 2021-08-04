// import modules:
require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const expresslayout = require("express-ejs-layouts");
const path = require("path");
const port = process.env.port || 80;
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const Mongodbstore = require("connect-mongo")(session);
const passport = require("passport");
const items = require("../app/models/menu");
// database connection:
const url = "mongodb://localhost/zip";
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

// information about connection:
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("database connected...");
  })
  .catch((err) => {
    console.log("connection failed");
  });

// session store:
let mongostore = new Mongodbstore({
  mongooseConnection: connection,
  collection: "sessions",
});

// session config
app.use(
  session({
    secret: process.env.COOKIES_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongostore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

// passport confing:
const passportInit = require("../app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// assets:
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// to set local variable  in ejs page:
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

app.use(expresslayout);

// app.set('views', './views/home.ejs')
app.set("view engine", "ejs");
app.set("/views", path.join(__dirname, "veiws")); // connect with file

app.get("/allll/items", async (req, res) => {
  const zips = await items.find();
  res.send(zips);
});

// rendering page:
require("./routes")(app);

// prot listening:
app.listen(port, () => {
  console.log("listing on port", port);
});
