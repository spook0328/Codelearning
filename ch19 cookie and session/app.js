require("dotenv").config(); //dotenv需要的
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

//middleware
//祕密的string 我寫秘密strtng
app.use(cookieParser(process.env.MYCOOKIESECRETKEY));
//秘密的string我寫這裡是祕密的值
app.use(
  session({
    secret: process.env.MYSESSIONSECRETKEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // localhost沒有htpps所以設定false
  })
);
app.use(flash()); //connect-flash需增加

//check verify 改next寫法
const checkUser = (req, res, next) => {
  if (!req.session.isVerified) {
    return res.send("請先登入系統，才能看到資料。");
  } else {
    next();
  }
};

app.get("/", (req, res) => {
  req.flash("message", " Welcome to this page"); //flash運用
  return res.send("Home page" + req.flash("message"));
});

//當使用者來到此網頁就要給他一個cookie
app.get("/setCookie", (req, res) => {
  console.log(req.signedCookies);
  //cookie 是用key value pair
  //   res.cookie("yourCookie", "Oreo"); //一般cookie
  res.cookie("yourCookie", "Oreo", { signed: true }); //sign cookie
  return res.send("看一下已經設置cookie");
});

//cookie parser

app.get("/seeCookie", (req, res) => {
  //   return res.send("你所設定好的cookie為..." + req.cookies.yourCookie);
  return res.send("你所設定好的cookie為..." + req.signedCookies.yourCookie);
});

//session
app.get("/setSessionData", (req, res) => {
  req.session.example = "something not important ...";
  return res.send("在伺服器設置session資料，在瀏覽器設置session id");
});

app.get("/seeSessionData", (req, res) => {
  console.log(req.session);
  //connect.sid => session id
  return res.send("看一下已經設置session資料");
});

//用網頁模擬登入成功
app.get("/verifyUser", (req, res) => {
  req.session.isVerified = true;
  return res.send("成功驗證");
});

//用Session模擬登入，然後用checkUser確認已經登入
app.get("/secret", checkUser, (req, res) => {
  return res.send("資料是:session很好玩");
});
//這樣另外一個也需要登入才能看到
app.get("/secret2", checkUser, (req, res) => {
  return res.send("資料是:session2");
});

app.listen(3000, () => {
  console.log("server runninig on port 3000");
});
