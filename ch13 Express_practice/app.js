const express = require("express"); //我們require express，並給予我們一個function
const app = express(); //這邊把執行express function 得到的object 命名為app

//midleware 寫法
app.use((req, res, next) => {
  console.log("正在啟動midleware...");
  next();
});

//需要middleware，不然post拿到東西會呈現Undifined
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //extend =擴展

//middleware 除了放在route之前，也可以放在route內部的path及callbackFN之間。
function myMiddleware(req, res, next) {
  console.log("正在執行myMiddleware...");
  next();
}

//另外的寫法，直接把Middleware寫到route裡面。就不用再寫一個function的話。
// app.get(
//   "/students",
//   [
//     (req, res, next) => {
//       console.log("正在執行myMiddleware...");
//       next();
//     },
//     (req, res, next) => {
//       console.log("正在執行myMiddleware2...");
//       next();
//     },
//   ],
//   async (req, res) => {
//     try {
//       let studentData = await Student.find({}).exec();
//       return res.send(studentData);
//     } catch (e) {
//       return res.status(500).send("尋找資料產生錯誤");
//     }
//   }
// );

//Get找學生資料
app.get("/students", myMiddleware, async (req, res) => {
  try {
    let studentData = await Student.find({}).exec();
    return res.send(studentData);
  } catch (e) {
    return res.status(500).send("尋找資料產生錯誤");
  }
});

//Route
//Http request, GET, POST, PUT, DELETE
app.get("/", (req, res) => {
  res.send("Welcome"); //送給用戶端
});

app.get("/anotherPage", (req, res) => {
  res.send("AnotherPage");
});

app.get("/example", (req, res) => {
  //   res.send("<h1>這是H1示範</h1>"); //header
  //   res.send("<p>這是p示範</p>"); //header
  // 不能設兩個header，因此不會再p 的部分出現一次
  res.sendFile(__dirname + "/index.html"); //可以直接用__dirname 直接變成絕對路徑。
});

app.get("/ex2", (req, res) => {
  //練習給json檔
  let obj = {
    title: "Web Design",
    website: "Udemy",
  };
  res.json(obj);
});

app.get("/ex3", (req, res) => {
  res.redirect("actualExample"); //練習重新導向res.redirect
});

app.get("/actualExample", (req, res) => {
  res.send("真正的資源"); //真正的資源
});

//練習status code
app.get("*", (req, res) => {
  res.status(404).send("錯誤頁面...");
  //return res object method chaining
});

//練習 req.body
app.post("/reqTesting", (req, res) => {
  let { email, password } = req.body;
  res.send("你的信箱是" + email);
});

//練習req.params
app.get("/fruit", (req, res) => {
  res.send("Welcome Fruit Home Page");
});
//這樣只要fruit後面的網站都可以跳出相關的頁面
app.get("/fruit/:someFruit", (req, res) => {
  res.send("歡迎來到" + req.params.someFruit + "Page");
});

//練習req.query
app.get("/formHandling", (req, res) => {
  res.send(
    "伺服器收到表單資料，你所提交的資料為，名稱:" +
      req.query.name +
      "年齡為" +
      req.query.age
  );
});

//這一定要放在最後面，不然放到最前面會把全部都變成404
app.get(/(.*)/, (req, res) => {
  res.send("404 NOT FOUND");
});

//port, callback
//監聽
app.listen(3000, () => {
  console.log("伺服器正在聆聽port 3000...");
});
