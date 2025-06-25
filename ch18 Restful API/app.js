const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.set("view engine", "ejs");

//連接到mongooseDB
mongoose
  .connect("mongodb://localhost:27017/testDB")
  .then(() => {
    console.log("成功連結mongodb...");
  })
  .catch((e) => {
    console.log(e);
  });

//監聽 
add.listen(3000, () => {
  console.log("伺服器在3000上運行");
});
