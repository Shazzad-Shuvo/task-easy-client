import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-[90rem] mx-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Root;
