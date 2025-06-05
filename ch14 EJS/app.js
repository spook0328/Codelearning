const { name } = require("ejs");
const express = require("express"); //我們require express，並給予我們一個function
const app = express(); //這邊把執行express function 得到的object 命名為app

app.use(express.static("public"));
app.set("view engine", "ejs"); //這樣就可以後面get不用再設ejs副檔名

// app.get("/", (req, res) => {
//   let myString = "<h1>hello world</h1>";
//   res.render("index", { myString });
// });

app.get("/", (req, res) => {
  const languages = [
    { name: "JAVA", rating: 9.5, trending: "Super Hot" },
    { name: "C++", rating: 9.0, trending: "Super Hot" },
    { name: "JS", rating: 8.5, trending: " Hot" },
  ];

  res.render("form", { languages });
});

// app.get("/exm", (req, res) => {
//   let { name, age } = req.query;
//   res.render("response", { name, age });
// });

// app.get("/:name", (req, res) => {
//   let { name } = req.params;
//   //JS中，出現object 屬性與variable   相同的狀況，
//   // 可以省略下方{name:name}=>{name}
//   res.render("index", { name });
// });

app.listen(3000, () => {
  console.log("伺服器正在聆聽port 3000...");
});
