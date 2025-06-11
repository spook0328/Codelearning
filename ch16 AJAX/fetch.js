//要講async function 裡面給予await關鍵字，
// 回傳的問建就會成為URL 的 responcs object

//當改成response object若要回應錯誤，已經不能用catch。
//這時就可以用try
async function fetchProduct(p) {
  try {
    const response = await fetch(
      //增加await，會讓程式碼在這邊等待直到完成為止。
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
    );
    const data = await response.json();
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}
fetchProduct();

//若沒增加，那只會給予promise object
//當是promise物件，要拿取參數，就要用.then、.cathch 等語法。
async function myFunc() {
  return 100;
}

let result = myFunc();
result.then((data) => console.log(data));
console.log(result);
