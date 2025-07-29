import React, { useState } from "react";

const Create = ({ message, setMessages }) => {
  let [input, setInput] = useState("");

  const submitButtonHandler = (e) => {
    e.preventDefault(); //submit 不會重整
    setMessages([...message, input]);
    setInput("");
  };
  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <form>
      <input onChange={inputHandler} value={input} type="text" />
      <button onClick={submitButtonHandler}>submit</button>
    </form>
  );
};

export default Create;
