import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {useQuery} from "@tanstack/react-query";

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
      <h2 className="text-3xl font-semibold text-center">My Classes</h2>
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
              <p className="text-[16px] font-semibold">
                Status: {classInfo.status}
              </p>
              <p className="text-[16px] font-semibold">
                Price: ${classInfo.price}
              </p>
              <p className="text-[16px] font-semibold">
                Enrolled Students: {classInfo?.enrolledStudents || "0"}
              </p>

              <div className="card-actions justify-end">
                <button className="btn">EDIT</button>
                {classInfo.status === "denied" && (
                  <button className="btn">Feedback</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClasses;
