import React, { useState } from "react";
import "./styles/styles.css";

//state 是狀態的意思
const Info = ({ message, setMessages }) => {
  return (
    <div className="info">
      {message.map((message, index) => {
        return <p key={index}>學習內容是{message}</p>;
      })}
    </div>
  );
};

export default Info;

//arr.forEach()
