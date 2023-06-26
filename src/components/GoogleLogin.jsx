import React from "react";
import useAuth from "../hooks/useAuth";
import {useLocation, useNavigate} from "react-router-dom";
import {FaGoogle} from "react-icons/fa";

const GoogleLogin = () => {
  const {googleSignIn} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        navigate(from, {replace: true});
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div>
      <div className="divider m-0 pb-4"></div>
      <div className="text-center mb-4">
        <button onClick={handleGoogleSignIn} className="btn btn-neutral">
          <FaGoogle /> Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default GoogleLogin;
