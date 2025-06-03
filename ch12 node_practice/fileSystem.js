//fs(file system)

//更新日誌，自動把錯誤記錄下來。
const fs = require("fs");

fs.writeFile("myFile.txt", "系統測試錯誤紀錄", (e) => {
  if (e) throw e;

  console.log("文件撰寫完成");
});

//讀文件
fs.readFile("myFile.txt", "utf8", (e, data) => {
  //一種寫法
  if (e) throw e;

  //一種寫法，直接顯示e訊息。
  //if(e){console.log(e)};

  console.log(data);
});
