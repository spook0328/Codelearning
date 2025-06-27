const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Student = require("./models/student");
//cors 用法
const cors = require("cors");

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
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); //現在可以開始接受同台電腦來的請求

//Get找學生資料
app.get("/students", async (req, res) => {
  try {
    let studentData = await Student.find({}).exec();
    return res.send(studentData);
  } catch (e) {
    return res.status(500).send("尋找資料產生錯誤");
  }
});

//找特定ID學生
app.get("/students/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let foundStudent = await Student.findOne({ _id }).exec();
    return res.send(foundStudent);
  } catch (e) {
    return res.status(500).send("尋找資料產生錯誤");
  }
});

//Post 創建新學生資料
app.post("/students", async (req, res) => {
  try {
    let { name, age, major, merit, other } = req.body;
    let newStudent = new Student({
      name,
      age,
      major,
      scholarShip: { merit, other },
    });
    //回傳資料
    let saveStudent = await newStudent.save();
    return res.send({
      msg: "資料儲存成功",
      saveObject: saveStudent,
    });
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

//Put 修改資料，修改後會直接覆蓋成為新資料
app.put("/students/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let { name, age, major, merit, other } = req.body;
    //下面的寫法，是說若有任何key沒給的話，他就會變成undefinded和呈現到數據中。
    let newData = await Student.findOneAndUpdate(
      { _id },
      { name, age, major, scholarShip: { merit, other } },
      {
        new: true,
        runValidators: true,
        overwrite: true, //覆蓋所有數據
        //因為Http put request 要求客戶端提供所有數據，
        //所以我們需要根據數據，來更新資料庫內的資料。
      }
    );
    res.send({ msg: "成功更新資料!", updatedData: newData });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//coding小技巧，若要patch，但不確定req.body裡面有多少東西
//因此製作一個class
class NewData {
  constructor() {}
  setProperty(key, value) {
    if (key !== "merit" && key !== "other") {
      this[key] = value;
    } else {
      this[`scholarship.${key}`] = value;
    }
  }
}

//Patch 只會修改有更改的地方
app.patch("/students/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    //coding小技巧運用處
    let newObject = new NewData();
    //用for loop去跑是因為要讓body換成newObject
    for (let property in req.body) {
      newObject.setProperty(property, req.body[property]);
      //這時req.body給的資料無法直接儲存到DB
      //因此還需要用newObject在外面才會呈現平常在DB上看得的方式。
      //可以用console.log()分別測試兩者看出差別
      let newData = await Student.findByIdAndUpdate({ _id }, newObject, {
        new: true,
        runValidators: true,
        //不能寫overwrite: true，這樣就會覆蓋掉全部了
      });
      res.send({ msg: "成功更新資料!", updatedData: newData });
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//Delete
app.delete("/students/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let deleteResult = await Student.deleteOne({ _id });
    return res.send(deleteResult);
  } catch (e) {
    console.log(e);
    return res.status(500).send("無法刪除學生資料");
  }
});

//監聽
app.listen(3000, () => {
  console.log("伺服器在3000上運行");
});
