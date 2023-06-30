import React from "react";
import {useForm} from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const img_hosting_token = import.meta.env.VITE_Img_Hosting_Token;

const AddClass = () => {
  const [axiosSecure] = useAxiosSecure();
  const {user} = useAuth();
  const {
    handleSubmit,
    register,
    reset,
    formState: {errors},
  } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.url;
          const {
            className,
            instructorName,
            instructorEmail,
            price,
            availableSeats,
          } = data;
          const newClass = {
            className,
            instructorName,
            instructorEmail,
            price: parseFloat(price),
            availableSeats: parseInt(availableSeats),
            image: imgURL,
            status: "pending",
          };
          axiosSecure.post("/classes", newClass).then((data) => {
            if (data.data.insertedId) {
              reset();
              Swal.fire(
                "Good job!",
                "New Class Added Successfully!",
                "success"
              );
            }
          });
        }
      });
  };

  return (
    <div className="w-full">
      <div className="mx-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-1 mt-20 lg:mt-0">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Class Name*</span>
            </label>
            <input
              type="text"
              {...register("className", {required: true})}
              placeholder="Class Name"
              className="input input-bordered input-accent w-full"
            />
          </div>

          <div className="flex gap-3 pt-3">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Instructor Name*
                </span>
              </label>
              <input
                type="text"
                defaultValue={user?.displayName}
                readOnly
                {...register("instructorName", {required: true})}
                placeholder="Instructor Name"
                className="input input-bordered input-accent w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Instructor Email*
                </span>
              </label>
              <input
                type="text"
                {...register("instructorEmail", {required: true})}
                defaultValue={user.email}
                readOnly
                placeholder="Instructor Email"
                className="input input-bordered input-accent w-full"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-3">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Available Seats*</span>
              </label>
              <input
                type="number"
                placeholder="Available Seats"
                {...register("availableSeats", {required: true})}
                className="input input-bordered input-accent w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Price*</span>
              </label>
              <input
                type="number"
                placeholder="Class Price"
                {...register("price", {required: true})}
                className="input input-bordered input-accent w-full"
              />
            </div>
          </div>
          <div className="form-control pb-2">
            <label className="label">
              <span className="label-text">Class Image*</span>
            </label>
            <input
              type="file"
              {...register("image", {required: true})}
              className="file-input file-input-bordered w-full"
            />
          </div>
          <input
            className="btn btn-outline btn-sm"
            type="submit"
            value="Add Class"
          />
        </form>
      </div>
    </div>
  );
};

export default AddClass;
