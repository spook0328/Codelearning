const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes");
<<<<<<< HEAD
require("./config/passport");
const session = require("express-session");
const passport = require("passport");

//連接MongoDB
mongoose
  .connect("mongodb://localhost:27017/GoogleDB")
=======

//連接MongoDB
mongoose
  .connect("mongodb://locoalhost:27017/GoogleDB")
>>>>>>> 6f67548 (project 7)
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
<<<<<<< HEAD
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

=======
>>>>>>> 6f67548 (project 7)
//設定routes
app.use("/auth", authRoutes);

//route
app.get("/", (req, res) => {
  return res.render("index");
});

//監聽
app.listen(8080, () => {
  console.log("Server running on port 8080...");
});
