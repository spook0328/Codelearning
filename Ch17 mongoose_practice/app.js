//要開始連接odm(object document mapping)
//所以把express, mongoose 和 mongoDB連接
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Schema } = mongoose;

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
const studentSchema = new Schema({
  name: String,
  age: Number,
  major: String,
  schoarship: {
    merit: Number,
    other: Number,
  },
});

//model
const Student = mongoose.model("Student", studentSchema);
//製作新object
const newObject = new Student({
  name: "Eric",
  age: 27,
  major: "Math",
  Scohlarship: { merit: 6000, other: 7000 },
});
newObject
  .save()
  .then((saveObject) => {
    console.log("資料已經儲存完畢，存的資料是:");
    console.log(saveObject);
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(3000, () => {
  console.log("伺服器正在聆聽Port 3000...");
});
