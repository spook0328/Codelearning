import Nav from "./Nav";
import Info from "./info";
// 這裡寫的都是JSX，這都是JS語法，但可以用的像是HTML是因為我們用的是JSX
function App() {
  let friends = [
    { name: "小名", age: 16 },
    { name: "小恩", age: 16 },
    { name: "小劉", age: 16 },
  ];

  return (
    <div>
      {/* 這是把componet 放進來的地方，向下面的Nav和Info */}
      <Nav />
      {friends.map((friend) => (
        <Info name={friend.name} age={friend.age} />
      ))}
    </div>
  );
}

export default App;
