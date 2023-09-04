import React from "react";
import img from "../../../assets/mail.png";
import Swal from "sweetalert2";

const Newsletter = () => {
  const handleSubscribed = (e) => {
    e.preventDefault();
    Swal.fire("Good job!", "You have subscribed!", "success").then((result) => {
      e.target.name.value = "";
      e.target.email.value = "";
    });
  };
  return (
    <div className="my-10 lg:my-24">
      <h3 className="text-3xl text-center font-semibold my-10 lg:my-16">
        Get Updates (Newsletter)
      </h3>
      <div className="flex flex-col lg:flex-row justify-evenly items-center gap-10 md:gap-0 mb-16">
        <div>
          <img src={img} alt="newsletter-image" />
        </div>
        <div
          className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
          data-aos="zoom-out-up">
          <form onSubmit={handleSubscribed} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="Name"
                required
                name="name"
                placeholder="Name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Email"
                name="email"
                required
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                className="btn btn-neutral"
                value={"Subscribe"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
