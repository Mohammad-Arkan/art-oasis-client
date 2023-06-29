import React from "react";
import useAuth from "../hooks/useAuth";
import {Navigate, useLocation} from "react-router-dom";

const PrivateRoute = ({children}) => {
  const {user, loading} = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center">
        <progress className="progress w-56 my-[10vh]"></progress>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

export default PrivateRoute;
