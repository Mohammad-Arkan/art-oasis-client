import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {useQuery} from "@tanstack/react-query";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();

  const {data: classes = [], refetch} = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
    },
  });

  const handleApproveClass = (classInfo) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve This Class",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/classes/${classInfo._id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              refetch();
              Swal.fire(
                "Good job!",
                `${classInfo.className} Course Approved Successfully`,
                "success"
              );
            }
          });
      }
    });
  };

  return (
    <div className="my-20">
      <h2 className="text-3xl font-semibold text-center">
        <span className="border-b-4 rounded-full px-10 py-2">
          Manage Classes
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-14">
        {classes.map((classInfo, idx) => (
          <div
            key={idx}
            className="card card-compact w-96 bg-base-100 shadow-xl mx-5">
            <figure>
              <img src={classInfo.image} />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-[18px]">
                Class Name: {classInfo.className}
              </h2>
              <p className="card-info">Status: {classInfo.status}</p>
              <p className="card-info">Class Price: ${classInfo.price}</p>
              <p className="card-info">
                Available Seats: {classInfo.availableSeats}
              </p>
              <p className="card-info">
                Instructor Name: {classInfo.instructorName}
              </p>
              <p className="card-info">
                Instructor Email: {classInfo.instructorEmail}
              </p>

              <div className="card-actions justify-center mt-3">
                <button
                  onClick={() => handleApproveClass(classInfo)}
                  disabled={
                    (classInfo.status === "approved") === true ||
                    (classInfo.status === "denied") === true
                  }
                  className="btn">
                  Approve
                </button>

                <button
                  className="btn"
                  disabled={
                    (classInfo.status === "approved") === true ||
                    (classInfo.status === "denied") === true
                  }>
                  Deny
                </button>
                <button className="btn">
                  <Link to={`/feedback/${classInfo._id}`}>Send Feedback</Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageClasses;
