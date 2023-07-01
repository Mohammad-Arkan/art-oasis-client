import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {useQuery} from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import {FaShoppingCart} from "react-icons/fa";

const SelectedClasses = () => {
  const {user} = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const {data: selectedClass = [], refetch} = useQuery({
    queryKey: ["selected", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/selected/classes/${user?.email}`);
      return res.data;
    },
  });

  console.log(selectedClass);
  return (
    <div className="my-20">
      <h2 className="text-3xl font-semibold text-center">
        <span className="border-b-4 rounded-full px-10 py-2">My Classes</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-14">
        {selectedClass.map((classInfo, idx) => (
          <div
            key={idx}
            className="card card-compact w-96 bg-base-100 shadow-xl mx-5 p-3">
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

              <button className="btn mt-4 text-[16px] btn-outline">
                <FaShoppingCart /> PAY NOW
              </button>

              <div className="card-actions justify-end absolute -right-3 -top-3">
                <button className="btn btn-circle btn-outline text-xl">
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
