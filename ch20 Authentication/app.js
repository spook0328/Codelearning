//這是要測試hash function 中的 Bcrypt，測試他計算hash value
require("dotenv").config(); //dotenv需要的
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const Student = require("./models/student");
const bcrypt = require("bcrypt");
const saltRounds = 12; //可以直接在這邊設定，通常8, 10, 12, 14...

//middleware
mongoose
  .connect("mongodb://localhost:27017/testDB")
  .then(() => {
    console.log("成功連結MongoDB...");
  })
  .catch((e) => {
    console.log(e);
  });

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

//動解析 JSON 格式的 body 資料，並放進 req.body 裡。
app.use(express.json());
//HTML 表單預設格式）時，自動解析資料到 req.body。
app.use(express.urlencoded({ extended: true }));
const veriflyUser = (req, res, next) => {
  if (req.session.isVerifed) {
    next();
  } else {
    return res.send("請先登入");
  }
};

app.get("/students", async (req, res) => {
  let foundStudent = await Student.find({}).exec();
  return res.send(foundStudent);
});

app.post("/students", async (req, res) => {
  try {
    let { username, password } = req.body;
    let hashvalue = await bcrypt.hash(password, saltRounds);
    let newStudent = new Student({ username, password: hashvalue });
    let saveStudent = await newStudent.save();
    return res.send({ message: "成功新增學生", saveStudent });
  } catch (e) {
    return res.status(400).send(e);
  }
});

app.post("/students/login", async (req, res) => {
  try {
    let { username, password } = req.body;
    let foundStudent = await Student.findOne({ username }).exec();
    if (!foundStudent) {
      return res.send("username錯誤，查無使用者");
    } else {
      let result = await bcrypt.compare(password, foundStudent.password);
      if (result) {
        req.session.isVerifed = true;
        return res.send("登入成功...");
      } else {
        return res.send("登入失敗");
      }
    }
  } catch (e) {
    return res.status(400).send(e);
  }
});

app.post("/students/logout", (req, res) => {
  req.session.isVerifed = false;
  return res.send("你已經登出系統");
});

app.get("/secret", veriflyUser, (req, res) => {
  return res.send("jackychen");
});

app.listen(3000, () => {
  console.log("server runninig on port 3000");
});
