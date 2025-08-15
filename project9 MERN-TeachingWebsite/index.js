const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;
const passport = require("passport");
require("./config/passport")(passport);

//連接Mongoose
mongoose
  .connect("mongodb://localhost:27017/mernDB")
  .then(() => {
    console.log("connecting to mongoDB...");
  })
  .catch((e) => {
    console.log(e);
  });

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", authRoute);
//只有登入系統的人，才能新增課程或是註冊課程，要查看是不是有被jwt保護 是不是有有效的webtoken
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
);

app.listen(8080, console.log("後端伺服器聆聽在port8080"));
