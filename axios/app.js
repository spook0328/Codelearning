//介紹前端套件 axios 使用
//用fetch 方式，他會return 一個promise object
//但這裡面promise object 是一個responseObject
async function example1() {
  try {
    let responseObject = await fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
    ); //return promise
    let data = await responseObject.json();
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

//用axios 方式，也會return 一個promise object
//但這裡面promise object 是一個獨特的axios Response object
async function example2(params) {
  try {
    let axiosResponseObject = await axios.get(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
    );
    console.log(axiosResponseObject.data);
  } catch (e) {
    console.log(e);
  }
}

example1();
example2();
