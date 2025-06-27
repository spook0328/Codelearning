//跨來源檔案測試
async function getData() {
  let response = await fetch("http://localhost:3000/students");
  let data = await response.json();
  console.log(data);
}

getData();
