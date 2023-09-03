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
        const user = result.user;
        const saveUser = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          role: "student",
        };
        fetch("https://art-oasis-server.onrender.com/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        }).then((data) => {
          if (data.insertedId) {
            reset();
            Toast.fire({
              icon: "success",
              title: "User Logged In Successfully",
            });
          }
          navigate(from, {replace: true});
        });
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div>
      <div className="divider m-0 pb-4"></div>
      <div className="text-center mb-4">
        <button type="button" onClick={handleGoogleSignIn} className="btn">
          <FaGoogle /> Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default GoogleLogin;
