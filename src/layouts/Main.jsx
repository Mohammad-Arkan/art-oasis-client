import React, {useContext} from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import {AuthContext} from "../providers/AuthProvider";

const Main = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Main;
