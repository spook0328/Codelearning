import React from "react";
import "./styles/styles.css";

const Info = ({ name, age }) => {
  return (
    <div className="info">
      <h1>朋友名稱:{name}</h1>
      <h1>朋友年齡:{age}</h1>
    </div>
  );
};

export default Info;
