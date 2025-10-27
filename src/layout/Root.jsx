import { Outlet } from "react-router";
import Navbar from "../components/navbar/Navbar";

function Root() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
}

export default Root;
