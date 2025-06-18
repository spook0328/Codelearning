//要開始連接odm(object document mapping)
//所以把express, mongoose 和 mongoDB連接
//這份app.js會把示範CRUD和其他Mongoose功能

const { name } = require("ejs");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Schema } = mongoose;
const fs = require("fs");

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

//製作一個Mongooss schema
// const studentSchema = new Schema({
//   name: String,
//   age: { type: Number, min: [0, "年齡不能小於0"] },
//   major: String,
//   schoarship: {
//     merit: Number,
//     other: Number,
//   },
// });

//製作一個Mongooss schema 增加驗證器

const studentSchemaV = new Schema(
  {
    name: { type: String, required: true, minlength: 1 },
    age: { type: Number, min: [0, "年齡不能小於0"] },
    major: {
      type: String,
      //若merit大於3000，major就是必填
      required: function () {
        return this.schoarship.merit >= 3000;
      },
      enum: ["Chemistry", "CS", "Math", "Civic Engineering", "Undecided"],
      //enum很適合用在會員制的設定上
    },
    schoarship: {
      merit: { type: Number, default: 0 },
      other: { type: Number, default: 0 },
    },
    // },
    // //第一種作法增加Instance Method要在第一個參數後面增加
    // {
    //   //在methods裡面就可以加入function，去做計算
    //   methods: {
    //     printTotalScholarship() {
    //       return this.schoarship.merit + this.schoarship.other;
    //     },
    //   },
  }
  // ,
  // {
  //   //static作法也是可以在schema第二個參數後面增加
  //   statics: {
  //     //這次是做找尋學生的部分
  //     findAllMajorStudent(major) {
  //       return this.find({ major: major }).exec();
  //     },
  //   },
  // }
);

//第二種作法Instance Method作法
// studentSchemaV.methods.printTotalScholarship = function () {
//   return this.schoarship.merit + this.schoarship.other;
// };

//第二種作法Static Method作法
// studentSchemaV.statics.findAllMajorStudent = function (major) {
//   return this.find({ major: major }).exec();
// };

//第三種作法Static Method作法
// studentSchemaV.statics("findAllMajorStudent", function (major) {
//   return this.find({ major: major }).exec();
// });

//midleware 製作，schema.pre(‘save’, callbackFn)
//可以在儲存前，先做這一步midleware
studentSchemaV.pre("save", () => {
  fs.writeFile("record.txt", "A new data will be saved...", (e) => {
    if (e) throw e;
  });
});

//model
// const Student = mongoose.model("Student", studentSchema);
const Student = mongoose.model("Student", studentSchemaV);

let newStudent = new Student({
  name: "小名",
  age: 30,
  major: "CS",
  Scholarship: { merit: 500, other: 410 },
});

newStudent
  .save()
  .then((data) => {
    console.log("資料已經儲存完成");
  })
  .catch((e) => {
    console.log(e);
  });

//Instance 找尋呈現的方式
// Student.find({})
//   .exec()
//   .then((arr) => {
//     arr.forEach((Student) => {
//       console.log(
//         Student.name + "總獎學金是: " + studentSchemaV.printTotalScholarship
//       );
//     });
//   });

//Static 找尋呈現的方式
// Student.findAllMajorStudent("Math")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

//filter 在find中放一個empty object 是指找出所有資料
//find 會給予Querry(是一個thenable)，再加入exec就會成為promise object
//所以後面可以再接then。
// Student.find({})
//   .exec()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

//更簡化寫法用asynchronous function
// async function findStudent() {
//    try {
//     let data = await Student.find().exec();
//     console.log(data);
//   } catch (e) {
//     console.log(e);
//   }
// }

//再更進一步，製作一個route，並改寫成async的方式，在裡面使用await指令
// app.get("/", async (req, res) => {
//   try {
//     let data = await Student.findOne({ name: "Eric" }).exec();
//     res.send(data);
//   } catch (e) {
//     console.log(e);
//   }
// });

//更新資料做法
// Model.updateOne(filter, update, options)
// Student.updateOne(
//   { name: "Eric" },
//   { age: 17 },
//   { runValidators: true, new: true }
//   //但如果這裡new設定true，對updateOne無效
// )
//   .exec()
//   .then((msg) => {
//     console.log(msg);
//   })
//   .catch((e) => {
//     console.log(e);
//   });
//Model.updateMany(filter, update, options)
//一樣做法

//Model.findOneAndUpdate(condition, update, options)
//找到第一個符合條件並更新
// Student.findOneAndUpdate(
//   { name: "Eric" },
//   { name: "Willy" },
//   { runValidators: true, new: true }
// // 這裡會出現，並直接自動帶入到第一個符合的
// // 若new設成false，他會出現的是更新前的資料。
// )
//   .exec()
//   .then((newData) => {
//     console.log(newData);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

//Delete
// Model.deleteOne(conditions);
// Student.deleteOne({ name: "Wong" })
//   .exec()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// Student.find({})
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

//製作新object的作法
// const newObject = new Student({
//   name: "John",
//   age: 17,
//   major: "Art",
//   Scohlarship: { merit: 5000, other: 7000 },
// });

//儲存的作法
// newObject
//   .save()
//   .then((saveObject) => {
//     console.log("資料已經儲存完畢，存的資料是:");
//     console.log(saveObject);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// app.listen(3000, () => {
//   console.log("伺服器正在聆聽Port 3000...");
// });
