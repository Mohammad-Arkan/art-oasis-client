import React from "react";
import {NavLink, Outlet} from "react-router-dom";
import {
  FaAlignJustify,
  FaAlignLeft,
  FaAngleRight,
  FaArrowCircleRight,
  FaHistory,
  FaHome,
  FaList,
  FaListAlt,
  FaRegCheckCircle,
  FaShoppingCart,
  FaUser,
  FaUserCheck,
  FaUsers,
  FaUsersCog,
} from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
import useStudent from "../hooks/useStudent";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isStudent] = useStudent();
  const [, isInstructor] = useInstructor();
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <Outlet />
          <div className="absolute top-5 left-5">
            <label htmlFor="my-drawer-2" className="lg:hidden cursor-pointer">
              <span className="text-3xl">
                <FaAlignJustify />
              </span>
            </label>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-300 text-base-content">
            {isStudent && (
              <>
                <li>
                  <NavLink to={"/dashboard/student"}>
                    <FaUser /> Student Panel
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/selected-classes"}>
                    <FaAngleRight /> Selected Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/enrolled-classes"}>
                    <FaShoppingCart /> Enrolled Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/payment-history"}>
                    <FaHistory /> Payment History
                  </NavLink>
                </li>
              </>
            )}

            {isInstructor && (
              <>
                <li>
                  <NavLink to={"/dashboard/instructor-panel"}>
                    <FaRegCheckCircle /> Instructor Panel
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/instructor/my-classes"}>
                    <FaAlignLeft /> My Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/add-class"}>
                    <FaListAlt /> Add A Class
                  </NavLink>
                </li>
              </>
            )}
            {isAdmin && (
              <>
                <li>
                  <NavLink to={"/dashboard/admin-panel"}>
                    <FaUserCheck /> Admin Panel
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/manage-classes"}>
                    <FaList /> Manage Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/manage-users"}>
                    {" "}
                    <FaUsersCog /> Manage Users
                  </NavLink>
                </li>
              </>
            )}

            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/classes">
                <FaAlignLeft />
                Classes
              </NavLink>
            </li>
            <li>
              <NavLink to="/instructors">
                <FaUsers />
                Instructors
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">
                <FaArrowCircleRight />
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
