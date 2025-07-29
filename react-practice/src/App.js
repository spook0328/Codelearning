import React, { useState } from "react";
import Nav from "./Nav";
import Info from "./info";
import Create from "./Create";

// 這裡寫的都是JSX，這都是JS語法，但可以用的像是HTML是因為我們用的是JSX
function App() {
  let [message, setMessages] = useState([]);

  return (
    <div>
      <Create message={message} setMessages={setMessages} />
      <Info message={message} setMessages={setMessages} />
    </div>
  );
}

export default App;
