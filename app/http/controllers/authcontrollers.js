const User = require("../../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

function authcontroller() {
  return {
    login(req, res) {
      res.render("auth/login");
    },
    PostLogin(req, res, next) {
      //  input checKing:

      const { email, password } = req.body;
      if (!email || !password) {
        req.flash("error", "All fields are required");
        return res.redirect("/login");
      }

      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }
        if (!user) {
          req.flash("error", info.message);
          return res.redirect("/login");
        }
        req.login(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return res.redirect("/login");
          }
          return res.redirect("/");
        });
      })(req, res, next);
    },

    register(req, res) {
      res.render("auth/register");
    },
    async postregister(req, res) {
      const { name, email, password } = req.body;
      // validate request:
      if (!name || !email || !password) {
        req.flash("error", "All fields are required");
        req.flash("name", name);
        req.flash("email", email);
        return res.redirect("/register");
      }
      // checking email
      User.exists({ email: email }, (err, result) => {
        if (result) {
          req.flash("error", "Email already taken");
          req.flash("name", name);
          req.flash("email", email);
          return res.redirect("/register");
        }
      });

      // hash password:
      const safepassword = await bcrypt.hashSync(password, 10);

      // create a user collection in database:
      const user = new User({
        name,
        email,
        password: safepassword,
      });
      console.log(user);

      user
        .save()
        .then((user) => {
          // loginss
          return res.redirect("/login");
        })
        .catch((err) => {
          req.flash("error", "Smothing went worng");
          return res.redirect("/register");
        });
      console.log(req.body);
    },
    logout(req, res, next) {
      req.logout();
      return res.redirect("/login");
    },
  };
}
module.exports = authcontroller;
