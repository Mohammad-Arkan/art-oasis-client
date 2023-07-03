import {useForm} from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import Swal from "sweetalert2";
import {Helmet} from "react-helmet-async";

const UpdateClass = () => {
  const {id} = useParams();
  const [axiosSecure] = useAxiosSecure();
  const {
    handleSubmit,
    register,
    reset,
    formState: {errors},
  } = useForm();

  const {data: classInfo = [], refetch} = useQuery({
    queryKey: ["class", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/class/${id}`);
      return res.data;
    },
  });

  const onSubmit = (data) => {
    if (data.price < 0 || data.availableSeats < 0) {
      alert("Can'be Negetive Number");
      return;
    }
    const {className, price, availableSeats} = data;
    const updateClass = {
      className,
      price: parseFloat(price),
      availableSeats: parseInt(availableSeats),
    };

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update This Class!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/class/${id}`, updateClass).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            reset();
            refetch();
            Swal.fire("Good job!", "Class Updated Successfully!", "success");
          }
        });
      }
    });
  };

  return (
    <div className="w-full">
      <Helmet>
        <title>Art Oasis | Update Class</title>
      </Helmet>
      <div className="flex justify-center mt-10">
        <img className="rounded-xl" width={400} src={classInfo.image} alt="" />
      </div>
      <div className="w-11/12 md:w-10/12  mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1 lg:mt-0">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Class Name*</span>
            </label>
            <input
              type="text"
              defaultValue={classInfo.className}
              {...register("className", {required: true})}
              placeholder="Class Name"
              className="input input-bordered input-accent w-full"
            />
          </div>

          <div className="flex gap-3">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Available Seats*
                </span>
              </label>
              <input
                type="number"
                placeholder="Available Seats"
                defaultValue={classInfo.availableSeats}
                {...register("availableSeats", {required: true})}
                className="input input-bordered input-accent w-full"
              />
            </div>
            <div className="form-control w-full mb-2">
              <label className="label">
                <span className="label-text font-semibold">Price*</span>
              </label>
              <input
                type="number"
                defaultValue={classInfo.price}
                placeholder="Class Price"
                {...register("price", {required: true})}
                className="input input-bordered input-accent w-full"
              />
            </div>
          </div>
          <input
            className="btn btn-outline"
            type="submit"
            value="Update Class"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateClass;
