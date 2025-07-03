const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

//middleware
//祕密的string 我寫秘密strtng
app.use(cookieParser("秘密string"));

app.get("/", (req, res) => {
  return res.send("Home page");
});

//當使用者來到此網頁就要給他一個cookie
app.get("/setCookie", (req, res) => {
  console.log(req.signedCookies);
  //cookie 是用key value pair
  //   res.cookie("yourCookie", "Oreo"); //一般cookie
  res.cookie("yourCookie", "Oreo", { signed: true }); //sign cookie
  return res.send("已經設置cookie");
});

//cookie parser

app.get("/seeCookie", (req, res) => {
  //   return res.send("你所設定好的cookie為..." + req.cookies.yourCookie);
  return res.send("你所設定好的cookie為..." + req.signedCookies.yourCookie);
});

app.listen(3000, () => {
  console.log("server runninig on port 3000");
});
