import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Instructors from "../pages/Instructors/Instructor";
import Dashboard from "../layouts/Dashboard";
import PrivateRoute from "./PrivateRoute";
import MyClasses from "../pages/Dashboard/Instructor/MyClasses";
import AddClass from "../pages/Dashboard/Instructor/AddClass";
import AdminPanel from "../pages/Dashboard/Admin/AdminPanel";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import SelectedClasses from "../pages/Dashboard/Student/SelectedClasses";
import EnrolledClasses from "../pages/Dashboard/Student/EnrolledClasses";
import PaymentHistory from "../pages/Dashboard/Student/PaymentHistory";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/instructors",
        element: <Instructors />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "selected-classes",
        element: <SelectedClasses />,
      },
      {
        path: "enrolled-classes",
        element: <EnrolledClasses />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "instructor/my-classes",
        element: <MyClasses />,
      },
      {
        path: "add-class",
        element: <AddClass />,
      },
      {
        path: "admin-panel",
        element: (
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        ),
      },
      {
        path: "manage-classes",
        element: (
          <AdminRoute>
            <ManageClasses />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
