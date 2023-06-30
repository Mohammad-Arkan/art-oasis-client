import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import useInstructor from "../hooks/useInstructor";
import useAuth from "../hooks/useAuth";

const InstructorRoute = ({children}) => {
  const {user, loading} = useAuth();
  const [, isInstructor, isInstructorLoading] = useInstructor();
  const location = useLocation();

  if (loading || isInstructorLoading) {
    return (
      <div className="flex justify-center">
        <progress className="progress w-56 my-[10vh]"></progress>
      </div>
    );
  }

  if (user && isInstructor) {
    return children;
  }
  return <Navigate to="/" state={{from: location}} replace></Navigate>;
};

export default InstructorRoute;
