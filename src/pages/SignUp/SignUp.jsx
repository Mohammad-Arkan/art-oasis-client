import React, {useState} from "react";
import {Link} from "react-router-dom";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {useForm} from "react-hook-form";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = (data) => {
    if (!(data.password === data.confirmPassword)) {
      alert("confrim password didn't match");
      return;
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    console.log(showPassword);
  };

  return (
    <div>
      <div>
        <div className=" w-1/2 lg:w-1/3 mx-auto my-[10vh]">
          <div className="card shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <h1 className="text-xl font-bold text-center">Sign Up!</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  {...register("name", {required: true})}
                  placeholder="Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600 pt-1">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  {...register("email", {required: true})}
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600 pt-1">Email is required</span>
                )}
              </div>

              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  placeholder="password"
                  className="input input-bordered"
                />
                <button
                  onClick={handleTogglePassword}
                  className="absolute right-5 bottom-4 ">
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              <div>
                {errors.password?.type === "required" && (
                  <span className="text-red-600 pt-1">
                    Password is required
                  </span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="text-red-600 pt-1">
                    Password Must Be Less Then 20 Characters
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-600 pt-1">
                    Password Must have one uppercase, one lowercase, one number,
                    one special character [!@#$&*]
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-600 pt-1">
                    Password Must Be 8 Characters
                  </span>
                )}
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  name="confrimPassword"
                  {...register("confirmPassword", {required: true})}
                  placeholder="Confrim password"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">PhotoURL</span>
                </label>
                <input
                  type="text"
                  name="photoURL"
                  {...register("photoURL", {required: true})}
                  placeholder="PhotoURL"
                  className="input input-bordered"
                />
                {errors.photoURL && (
                  <span className="text-red-600 pt-1">
                    PhotoURL is Required
                  </span>
                )}
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value={"Sign Up"}
                />
              </div>
              <label className="label">
                <span className="label-text-alt ">
                  Already Have an Account?{" "}
                  <Link to="/login" className="link link-hover">
                    Login
                  </Link>
                </span>
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
