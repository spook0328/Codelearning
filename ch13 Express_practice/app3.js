//這是練習express.router的主要controller
const express = require("express");
const app3 = express();
const mongoose = require("mongoose");
const studentRoutes = require("./routes/ student-routes"); //express.router作法，這樣才抓得到。
const facultyRoutes = require("/routes/faculty-routes");

//連接到mongooseDB
mongoose
  .connect("mongodb://localhost:27017/testDB")
  .then(() => {
    console.log("成功連結mongodb...");
  })
  .catch((e) => {
    console.log(e);
  });

//middleware
app3.set("view engine", "ejs");
app3.use(express.json());
app3.use(express.urlencoded({ extended: true }));
app3.use(cors()); //現在可以開始接受同台電腦來的請求

//檢查url有沒有/students..以此類脫
//因此有這兩行就可以外接其他的routes
app3.use("/students", studentRoutes);
app3.use("/faculty", faculty - routes);

app3.use((err, req, res, next) => {
  console.log("正在使用這個middleware");
  return res.status(400).render("student-not-found");
});

//監聽
app3.listen(3000, () => {
  console.log("伺服器在3000上運行");
});
