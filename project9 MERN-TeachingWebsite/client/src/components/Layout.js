import { Outlet } from "react-router-dom";
import Nav from "./nav-component";

//component 參數解構({a,b})，如果寫(a,b)，b會抓不到
const Layout = ({ currentUser, setCurrentUser }) => {
  return (
    <>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Outlet />
    </>
  );
};

export default Layout;
