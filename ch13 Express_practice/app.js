const express = require("express"); //我們require express，並給予我們一個function
const app = express(); //這邊把執行express function 得到的object 命名為app

//Http request, GET, POST, PUT, DELETE
app.get("/", (req, res) => {
  res.send("Welcome"); //送給用戶端
});

app.get("/anotherPage", (req, res) => {
  res.send("AnotherPage");
});

//port, callback
//監聽
app.listen(3000, () => {
  console.log("伺服器正在聆聽port 3000...");
});
