import React, {useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import GoogleLogin from "../../components/GoogleLogin";
import {useForm} from "react-hook-form";

const Login = () => {
  const {signIn} = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        alert("user logged successfully");
        navigate(from, {replace: true});
      })
      .catch((err) => alert(err.message));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    console.log(showPassword);
  };

  return (
    <div>
      <div className=" w-1/2 lg:w-1/3 mx-auto my-[10vh]">
        <div className="card shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h1 className="text-xl font-bold text-center">Login!</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                {...register("email", {require: true})}
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                {...register("password", {require: true})}
                placeholder="password"
                className="input input-bordered"
              />
              <button
                onClick={handleTogglePassword}
                className="absolute right-5 bottom-12 ">
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input
                className="btn btn-neutral"
                type="submit"
                value={"Login"}
              />
            </div>
            <label className="label">
              <span className="label-text-alt ">
                Don't Have Account?{" "}
                <Link to="/signup" className="link link-hover">
                  Sign Up
                </Link>
              </span>
            </label>
          </form>
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
