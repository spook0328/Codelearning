//要示範Mutex exclusion Lock怎麼製作及運用。
//還有若沒增加Mutex ，Race condition 怎麼產生的。

let balance = 0; // shared resource
let mutex = Promise.resolve(); // return fulfilled Promise object

const randomDelay = () => {
  // return value is a Promise
  // and the time for this promise changing from pending to fulfilled
  // is random (0s-0.1s)
  return new Promise((resolve) => setTimeout(resolve, Math.random() * 100));
};

async function loadBalance() {
  await randomDelay(); // 等個隨機的0s~0.1s
  return balance;
}

async function saveBalance(value) {
  await randomDelay();
  balance = value;
}

async function sellGrapes() {
  mutex = mutex
    .then(async () => {
      const balance = await loadBalance();
      console.log(`賣葡萄前，帳戶金額為: ${balance}`);
      const newBalance = balance + 50;
      await saveBalance(newBalance);
      console.log(`賣葡萄後，帳戶金額為: ${newBalance}`);
    })
    .catch((e) => {
      console.log(e);
    });
  return mutex;
}

async function sellOlives() {
  mutex = mutex
    .then(async () => {
      const balance = await loadBalance();
      console.log(`賣橄欖前，帳戶金額為: ${balance}`);
      const newBalance = balance + 50;
      await saveBalance(newBalance);
      console.log(`賣橄欖後，帳戶金額為: ${newBalance}`);
    })
    .catch((e) => {
      console.log(e);
    });
  return mutex;
}

async function main() {
  await Promise.all([
    sellGrapes(),
    sellOlives(),
    sellOlives(),
    sellOlives(),
    sellGrapes(),
    sellGrapes(),
    sellGrapes(),
  ]);
  const balance = await loadBalance();
  console.log(`賣葡萄與橄欖後的帳戶金額是$${balance}`);
}

main();
