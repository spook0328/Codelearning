//最底層如何製作網頁伺服器的方法，但太費時。
const http = require("http"); //定義http
const fs = require("fs"); //可以讀取index.html

//創建伺服器
//創建一個request object 和 response object
const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
  if (req.url == "/") {
    res.write("歡迎來到我的網頁");
    res.end();
  } else if (req.url == "/anotherPage") {
    res.write("這是另一個網頁");
    res.end();
  } else if (req.url == "/index") {
    fs.readFile("index.html", (e, data) => {
      if (e) {
        res.write("存取html錯誤...");
        res.end();
      } else {
        res.write(data);
        res.end();
      }
    });
  } else {
    res.write("這是不存在網頁");
    res.end();
  }

  //增加writeHead給伺服器規範，不讓會亂碼
  //   res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
  //   res.write("歡迎來到我的網頁"); //用res 可以給回饋
  //   res.end(); //最後一定要加這行代表結束。
  //  console.log(req.headers); //可以看header 裡面有甚麼東西
});
// 要給他call back並有兩個參數
// ctrl + c 是停止伺服器運轉

server.listen(3000, () => {
  console.log("伺服器在port3000運行");
}); //伺服器監聽
