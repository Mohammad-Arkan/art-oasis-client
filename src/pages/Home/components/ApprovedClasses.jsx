import React from "react";
import useApprovedClasses from "../../../hooks/useApprovedClasses";
import {FaBookmark} from "react-icons/fa";
import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";
import useSelectClass from "../../../hooks/useSelectClass";
import {Fade} from "react-awesome-reveal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {useQuery} from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

const ApprovedClasses = () => {
  const [classes] = useApprovedClasses();
  const [isAdmin] = useAdmin();
  const {user} = useAuth();
  const [, isInstructor] = useInstructor();
  const [handleSelectClass] = useSelectClass();
  const [axiosSecure] = useAxiosSecure();

  const {data: selectedClasses = [], refetch} = useQuery({
    queryKey: ["selected", user?.email],
    queryFn: async () => {
      if (!user) return [];
      const res = await axiosSecure.get(`/selected/classes/${user?.email}`);
      const ids = [];
      for (const classes of res.data) {
        ids.push(classes.classId);
      }
      return ids;
    },
  });

  return (
    <div className="my-20">
      <h2 className="text-3xl font-semibold text-center">
        <span className="border-b-4 rounded-full px-10 py-2">
          Popular Classes
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-14">
        {classes.slice(0, 6).map((classInfo, idx) => (
          <div
            key={idx}
            className="card card-compact w-11/12 bg-base-100 shadow-xl mx-auto flex justify-between mt-5">
            <Fade>
              <figure>
                <img className="rounded-lg" src={classInfo.image} />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-xl">{classInfo.className}</h2>
                <p className="card-info">
                  Instructor Name: {classInfo.instructorName}
                </p>
                <p className="card-info">
                  Available Seats: {classInfo.availableSeats}
                </p>
                <p className="card-info">Price: ${classInfo.price}</p>
                <div className="card-actions mt-2">
                  <button
                    className="btn btn-block btn-neutral text-[16px]"
                    onClick={() => handleSelectClass(classInfo, refetch)}
                    disabled={
                      selectedClasses.includes(classInfo._id) ||
                      isAdmin ||
                      isInstructor
                    }>
                    <FaBookmark /> Select
                  </button>
                </div>
              </div>
            </Fade>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovedClasses;
