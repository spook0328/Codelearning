//很經典的eventLoop示範程式碼
//主要是預測的結果會是什麼樣子
//start => promise => async => end =>nextTick1 =>
//nextTick2=> promise then =>setTimeout =>setImmmediate
console.log("start"); //sync

//內部高級Queue，但要全部程式跑完，才會呈現。
process.nextTick(function () {
  console.log("nextTick1");
});

setTimeout(function () {
  console.log("setTimeout");
}, 0);

//call the constructor是一個sync function
new Promise(function (resolve, reject) {
  console.log("promise");
  resolve("resolve");
}).then(function (result) {
  console.log("promise then");
});

//IIFE 會Return 一個promise 會直接async呈現
(async function () {
  console.log("async");
})();

//check
setImmediate(function () {
  console.log("setImmediate");
});

//nextTickQue
process.nextTick(function () {
  console.log("nextTick2");
});

//end
console.log("end");
