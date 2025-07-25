import React from "react";

const Info = () => {
  let friends = ["小名", "小滑", "小張"];
  return (
    <div>
      <p>我的朋友們是: </p>
      {friends.map((friend) => {
        return <p>我的朋友有{friend}</p>;
      })}

      <h1>{5 * 10}</h1>
      <h1>{5 / 10}</h1>
      <h1>{Math.random()}</h1>
    </div>
  );
};

export default Info;
