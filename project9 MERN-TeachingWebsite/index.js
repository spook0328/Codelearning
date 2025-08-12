const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;

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

app.listen(8080, console.log("後端伺服器聆聽在port8080"));
