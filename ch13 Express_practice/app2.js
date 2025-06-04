//我們require express，並給予我們一個function
const express = require("express");
//這邊把執行express function 得到的object 命名為app
const app = express();

//要用mildware，這樣才能讀到CSS文件
//css文件要用相對路徑去寫
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//port, callback
app.listen(3000, () => {
  console.log("Server listening port 3000...");
});
