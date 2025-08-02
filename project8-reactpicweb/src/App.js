import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Homepage from "./Homepage";
import About from "./About";
import Page404 from "./Page404";

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
}

export default App;
