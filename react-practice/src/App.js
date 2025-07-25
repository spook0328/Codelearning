import Nav from "./Nav";
import Info from "./info";
// 這裡寫的都是JSX，這都是JS語法，但可以用的像是HTML是因為我們用的是JSX
function App() {
  return (
    <div>
      {/* 這是把componet 放進來的地方，向下面的Nav和Info */}
      <Nav />
      <Info />
    </div>
  );
}

export default App;
