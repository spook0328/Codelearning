//介紹前端套件 axios 使用
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

example1();
