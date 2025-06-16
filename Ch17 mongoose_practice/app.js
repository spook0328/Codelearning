//要開始連接odm(object document mapping)
//所以把express, mongoose 和 mongoDB連接
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.set("veiw engine", "ejs");

mongoose
  .connect("mongodb://localhost:27017/testDB")
  .then(() => {
    console.log("成功連結mongodb...");
  })
  .catch((e) => {
    console.log(e);
  });
//若不知道是在哪個地方可以開CMD看，然後打mongosh 可以知道127.0.1後面是什麼
//再來打show dbs 可以看到要連哪一個db

app.listen(3000, () => {
  console.log("伺服器正在聆聽Port 3000...");
});
