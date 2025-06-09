//Promise.all() 要測試多個fetch結果，並promise再一起
const fetchPromise1 = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
);
const fetchPromise2 = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found"
);
const fetchPromise3 = fetch(
  "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json"
);

Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
  .then((responses) => {
    responses.forEach((responses) => {
      console.log(responses.url, responses.status);
    });
  })
  .catch((e) => {
    console.log(e);
  });

//額外補充 Promise.any() 當你只要promise不管哪一個fulfilled就可以，就可以用promise.any()
