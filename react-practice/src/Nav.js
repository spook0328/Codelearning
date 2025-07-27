import React from "react";

const Nav = () => {
  return (
    <nav style={{ backgroundColor: "lightblue" }}>
      <ul>
        <li>
          <a href="#" style={{ color: "red" }}>
            首頁
          </a>
        </li>
        <li>
          <a style={{ color: "red" }} href="#">
            另一個頁面
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
