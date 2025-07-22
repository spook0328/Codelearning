const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
require("./config/passport");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");

//連接MongoDB
mongoose
  .connect("mongodb://localhost:27017/GoogleDB")
  .then(() => {
    console.log("connecting to mongodb ...");
  })
  .catch((e) => {
    console.log(e);
  });

//設定middlewares 以及引擎排版
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(passport.initialize()); //讓passport開始運行
app.use(passport.session()); //讓passport使用session
app.use(flash());

//打印消息，用res.local設定好屬性可以直接在這使用。
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//設定routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

//route
app.get("/", (req, res) => {
  return res.render("index", { user: req.user });
});

//監聽
app.listen(8080, () => {
  console.log("Server running on port 8080...");
});
