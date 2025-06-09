//看起來沒甚麼問題，但長時間運行同步會對程式有影響。
//用一個產生質數和對話匡做例子，會發現當要產生很多質數的時候就會當機了。
let max = 100000;

function isPrime(n) {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i == 0) {
      return false;
    }
  }
  return n > 1;
}

const random = (max) => Math.floor(Math.random() * max);

function generatePrimes(quota) {
  const primes = [];
  while (primes.length < quota) {
    const candidate = random(max);
    if (isPrime(candidate)) {
      primes.push(candidate);
    }
  }
  return primes;
}

const output = document.querySelector("div#output");
const button = document.querySelector("#generate");
button.addEventListener("click", (e) => {
  const quota = document.querySelector("#number");
  const primes = generatePrimes(Number(quota.value));
  output.innerHTML = primes;
});
