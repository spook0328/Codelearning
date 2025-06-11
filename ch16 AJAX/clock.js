const name = document.querySelector("#name");
const delay = document.querySelector("#delay");
const button = document.querySelector("#setAlarm");
const output = document.querySelector("#output");

//用一般function 製作出來的鬧鐘
// function alarm(person, delay) {
//   setTimeout(() => {
//     output.innerHTML = person + "起床!!";
//   }, delay);
// }

// button.addEventListener("click", (e) => {
//   alarm(name.value, delay.value);
// });

//用promise做出來。
//return promise object
//pending delay秒數後 => fulfilled
//若delay <0 => rejectecd
function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      reject("delay不能小於0");
    } else {
      setTimeout(() => {
        resolve(person + "起床!!");
      }, delay);
    }
  });
}

button.addEventListener("click", (e) => {
  let promiseObject = alarm(name.value, delay.value);
  promiseObject
    .then((message) => {
      output.innerHTML = message;
    })
    .catch((e) => {
      output.innerHTML = e;
    });
});

//更進一步改善code，用async和await的方式去做撰寫。
button.addEventListener("click", async () => {
  try {
    let result = await alarm(name.value, delay.value);
    output.innerHTML = result;
  } catch (e) {
    output.innerHTML = e;
  }
});
