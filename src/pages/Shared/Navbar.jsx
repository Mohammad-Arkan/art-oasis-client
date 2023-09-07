import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FaAlignLeft, FaArrowRight, FaHome, FaUsers} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import useStudent from "../../hooks/useStudent";
import useInstructor from "../../hooks/useInstructor";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const {user, loading, logout} = useAuth();
  const [isAdmin] = useAdmin();
  const [isStudent] = useStudent();
  const [, isInstructor] = useInstructor();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleThemeToggle = (e) => {
    e.target.checked ? setTheme("dark") : setTheme("light");
  };

  const handleLogOut = () => {
    logout();
  };
  const navItems = (
    <>
      <li>
        <Link>
          <FaHome />
          Home
        </Link>
      </li>
      <li>
        <Link to={"/classes"}>
          <FaArrowRight /> Classes
        </Link>
      </li>
      <li>
        <Link to={"/instructors"}>
          <FaUsers /> Instructors
        </Link>
      </li>

      {isStudent && (
        <li>
          <Link to={"/dashboard/selected-classes"}>
            <FaAlignLeft /> Selected Classes
          </Link>
        </li>
      )}
      {isInstructor && (
        <li>
          <Link to={"/dashboard/instructor/my-classes"}>
            <FaAlignLeft /> Manage Classes
          </Link>
        </li>
      )}
      {isAdmin && (
        <li>
          <Link to={"/dashboard/admin-panel"}>
            <FaAlignLeft /> Dashboard
          </Link>
        </li>
      )}
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navItems}
            </ul>
          </div>
          <Link to={"/"} className="btn btn-ghost normal-case text-xl mr-2">
            <img width={30} src={logo} alt="" />
            Art Oasis
          </Link>
          <input
            type="checkbox"
            onChange={handleThemeToggle}
            checked={theme === "light" ? false : true}
            className="toggle hidden md:flex"
          />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {user && (
            <>
              <span
                className="font-semibold hidden md:flex"
                title={user?.displayName}>
                {user?.displayName}
              </span>
              <span className="mx-3">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    className="rounded-full"
                    width={40}
                  />
                )}
              </span>
            </>
          )}
          {user ? (
            <button
              onClick={handleLogOut}
              className="btn btn-outline btn-sm md:btn-md">
              Logout
            </button>
          ) : (
            <>
              {loading || (
                <Link to={"/login"} className="btn btn-neutral">
                  Login
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
