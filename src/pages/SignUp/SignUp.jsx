import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {useForm} from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import GoogleLogin from "../../components/GoogleLogin";
import Swal from "sweetalert2";
import {Helmet} from "react-helmet-async";
export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {createUser, logout, updateUserProfile} = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  const onSubmit = (data) => {
    if (!(data.password === data.confirmPassword)) {
      alert("confrim password didn't match");
      return;
    }
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        updateUserProfile(data.name, data.photoURL).then(() => {
          const saveUser = {
            name: data.name,
            email: data.email,
            image: data.photoURL,
            role: "student",
          };
          fetch("https://art-oasis-server.onrender.com/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                reset();
                Toast.fire({
                  icon: "success",
                  title: "User Created Successfully",
                });
                logout();
                navigate("/login");
              }
            });
        });
      })
      .catch((err) => console.log(err));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Helmet>
        <title>Art Oasis | Sign Up</title>
      </Helmet>
      <div>
        <div className="w-11/12 lg:w-2/3 mx-auto my-[10vh]">
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
                <span
                  onClick={handleTogglePassword}
                  className="absolute right-5 bottom-4 ">
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
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
                  className="btn btn-neutral"
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
            <GoogleLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
