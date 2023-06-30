import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {useQuery} from "@tanstack/react-query";

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();

  const {data: classes = []} = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
    },
  });
  console.log(classes);

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
              <p className="text-[16px] font-semibold">
                Status: {classInfo.status}
              </p>
              <p className="text-[16px] font-semibold">
                Class Price: ${classInfo.price}
              </p>
              <p className="text-[16px] font-semibold">
                Available Seats: {classInfo.availableSeats}
              </p>
              <p className="text-[16px] font-semibold">
                Instructor Name: {classInfo.instructorName}
              </p>
              <p className="text-[16px] font-semibold">
                Instructor Email: {classInfo.instructorEmail}
              </p>

              <div className="card-actions justify-center mt-3">
                <button className="btn">Approve</button>
                <button className="btn">Deny</button>
                <button className="btn">Send Feedback</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageClasses;
