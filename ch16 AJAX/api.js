//串接api
//1. 從jokeAPI試著串接
let output = document.querySelector("#output");

async function hello() {
  try {
    let result = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?type=single"
    );
    let data = await result.json();

    output.innerText += data.joke + "\n";
  } catch (e) {
    console.log(e);
  }
}

let button = document.querySelector("#joke");
button.addEventListener("click", () => {
  hello();
});

//2. Weather API
//增加api key部分，我沒申請是亂打的。
let myKey = "abc12345";
let city = "Toroto";
let url = `https://api.openweathermap.org/data/2.5/weather?id=${}&appid=${myKey}`;

async function weather(params) {
    try{
        let result = await fetch (url);
        let data = await result.json();
        console.log(data);
    }catch(e){
        console.log(e)
    }
}

// weather();
