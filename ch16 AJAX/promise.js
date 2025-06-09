//這個檔案是在介紹promise的功能，還有fetch、then、e的部分
let fetchPromise = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
);

console.log(fetchPromise);

//這麼多的.then 會成爲callback hell
fetchPromise.then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
  // let jsonPromise = response.json(); //Response => Json
  // //Json message is also async
  // console.log(jsonPromise);
});

//callback hell 改善方法
//先return json並直接從後面接續then"data"
//然後只要不要有{}就可以把return刪除，因此可以直接寫出 .then((response) => response.json())
fetchPromise
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log(e);
  });
