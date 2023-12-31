import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {useQuery} from "@tanstack/react-query";
import {FaEdit} from "react-icons/fa";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet-async";

const MyClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const {user, loading} = useAuth();
  const {data: classes = []} = useQuery({
    queryKey: ["classes", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(`/classes/instructor/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Art Oasis | My Classes</title>
      </Helmet>
      <h2 className="text-3xl font-semibold text-center my-20">
        <span className="border-b-4 rounded-full px-10 py-2">My Classes</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-14">
        {classes.map((classInfo, idx) => (
          <div
            key={idx}
            className="card card-compact w-96 bg-base-100 shadow-xl mx-5 p-3">
            <figure>
              <img className="rounded-lg" src={classInfo.image} />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-xl">{classInfo.className}</h2>
              <p className="card-info">
                Status:{" "}
                <span
                  className={`${
                    classInfo.status === "approved" && "text-success"
                  } ${classInfo.status === "denied" && "text-error"}`}>
                  {classInfo.status}
                </span>
              </p>
              <p className="card-info">Price: ${classInfo.price}</p>
              <p className="card-info">
                Enrolled Students: {classInfo?.enrolledStudents || "0"}
              </p>

              {classInfo.status === "denied" && (
                <p className="card-info">
                  Feedback: {classInfo?.feedback || "No Feedback"}
                </p>
              )}
              {classInfo.status === "approved" && (
                <p className="card-info">
                  Feedback: {classInfo?.feedback || "No Feedback"}
                </p>
              )}

              <div className="card-actions justify-end absolute -right-3 -top-3">
                <Link to={`/update/class/${classInfo._id}`}>
                  <button className="btn btn-neutral btn-circle text-xl">
                    <FaEdit />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClasses;
