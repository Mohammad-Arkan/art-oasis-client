import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {useQuery} from "@tanstack/react-query";
import {FaEdit} from "react-icons/fa";

const MyClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const {user, loading} = useAuth();
  const {refetch, data: classes = []} = useQuery({
    queryKey: ["classes", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(`/classes/instructor/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="my-20">
      <h2 className="text-3xl font-semibold text-center">
        <span className="border-b-4 rounded-full px-10 py-2">My Classes</span>
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
              <h2 className="card-title text-xl">{classInfo.className}</h2>
              <p className="card-info">Status: {classInfo.status}</p>
              <p className="card-info">Price: ${classInfo.price}</p>
              <p className="card-info">
                Enrolled Students: {classInfo?.enrolledStudents || "0"}
              </p>
              {classInfo.status === "denied" ||
                (classInfo.status === "approved" && (
                  <p className="card-info">
                    Feedback: {classInfo?.feedback || "No Feedback"}
                  </p>
                ))}

              <div className="card-actions justify-end absolute -right-3 -top-3">
                <button className="btn btn-neutral btn-circle text-xl">
                  <FaEdit />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClasses;
