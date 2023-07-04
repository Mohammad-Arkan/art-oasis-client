import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {useQuery} from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import {FaShoppingCart} from "react-icons/fa";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet-async";

const SelectedClasses = () => {
  const {user} = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const {data: selectedClasses = [], refetch} = useQuery({
    queryKey: ["selected", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/selected/classes/${user?.email}`);
      return res.data;
    },
  });

  const handleDeleteClass = (classInfo) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/selected/class/${classInfo._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire(
              "Good job!",
              `[${classInfo.className}] Course Deleted from Selected Class`,
              "success"
            );
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="my-20">
      <Helmet>
        <title>Art Oasis | Selected Classes</title>
      </Helmet>
      <h2 className="text-3xl font-semibold text-center">
        <span className="border-b-4 rounded-full px-10 py-2">
          Selected Classes
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-20">
        {selectedClasses.map((classInfo, idx) => (
          <div
            key={idx}
            className="card card-compact w-[88%] bg-base-100 shadow-xl mx-5 p-3 my-3">
            <figure>
              <img className="rounded-lg" src={classInfo.classImage} />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-xl">{classInfo.className}</h2>
              <p className="card-info">Course Price: ${classInfo.price}</p>
              <p className="card-info">
                Instructor Name: {classInfo.instructorName}
              </p>
              <p className="card-info">
                Instructor Email: {classInfo.instructorEmail}
              </p>
              <Link
                className="btn mt-4 text-[16px] btn-outline"
                to={`/dashboard/payment/${classInfo._id}`}>
                <FaShoppingCart /> PAY NOW
              </Link>

              <div className="card-actions justify-end absolute -right-3 -top-3">
                <button
                  onClick={() => {
                    handleDeleteClass(classInfo);
                  }}
                  className="btn btn-circle btn-neutral text-xl">
                  &#10005;
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedClasses;
