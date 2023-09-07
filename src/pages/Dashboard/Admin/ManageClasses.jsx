import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {useQuery} from "@tanstack/react-query";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import useClasses from "../../../hooks/useClasses";

const ManageClasses = () => {
  const [classes, refetch] = useClasses();

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
        fetch(
          `http://ec2-54-224-233-65.compute-1.amazonaws.com:5000/approve/classes/${classInfo._id}`,
          {
            method: "PATCH",
          }
        )
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

  const handleDenyClass = (classInfo) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Deny This Class",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `http://ec2-54-224-233-65.compute-1.amazonaws.com:5000/deny/classes/${classInfo._id}`,
          {
            method: "PATCH",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              refetch();
              Swal.fire(
                "Good job!",
                `[${classInfo.className}] Course Denied Successfully`,
                "success"
              );
            }
          });
      }
    });
  };

  return (
    <div className="my-20">
      <Helmet>
        <title>Art Oasis | Manage Classes</title>
      </Helmet>
      <h2 className="text-3xl font-semibold text-center">
        <span className="border-b-4 rounded-full px-10 py-2">
          Manage Classes
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3 my-14">
        {classes.map((classInfo, idx) => (
          <div
            key={idx}
            className="card card-compact w-96 bg-base-100 shadow-xl mx-5 mt-5">
            <figure>
              <img src={classInfo.image} />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-[18px]">
                Class Name: {classInfo.className}
              </h2>
              <p className="card-info">
                Status:{" "}
                <span
                  className={`${
                    classInfo.status === "approved" && "text-success"
                  } ${classInfo.status === "denied" && "text-error"}`}>
                  {classInfo.status}
                </span>
              </p>
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
                  className="btn bg-green-200">
                  Approve
                </button>

                <button
                  className="btn bg-red-200"
                  onClick={() => handleDenyClass(classInfo)}
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
