import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Homepage from "./Homepage";
import About from "./About";
import Page404 from "./Page404";
import Nav from "./Nav";
import Info from "./info";
import Create from "./Create";
import Car from "./Car";

// 這裡寫的都是JSX，這都是JS語法，但可以用的像是HTML是因為我們用的是JSX
function App() {
  //router練習
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route index element={<Homepage />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
    </BrowserRouter>
  );

  // let [message, setMessages] = useState([]);
  let [myName, setMyName] = useState("A");
  const changeName = () => {
    setMyName("BC");
  };

  useEffect(() => {
    console.log("useEffect中內部function正在被執行");
  }, [myName]);
  return (
    <div>
      <Car brand="BMW" />
      <h1>{myName}</h1>
      <button onClick={changeName}>改變姓名</button>
      {/* <Create message={message} setMessages={setMessages} />
      <Info message={message} setMessages={setMessages} /> */}
    </div>
  );
}

export default App;
