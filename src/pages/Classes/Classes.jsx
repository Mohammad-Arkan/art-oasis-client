import React from "react";
import {FaBookmark} from "react-icons/fa";
import useApprovedClasses from "../../hooks/useApprovedClasses";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";
import useSelectClass from "../../hooks/useSelectClass";

const Classes = () => {
  const [classes] = useApprovedClasses();
  const [isAdmin] = useAdmin();
  const [, isInstructor] = useInstructor();
  const [handleSelectClass] = useSelectClass();

  return (
    <div className="my-10">
      <h2 className="text-3xl font-semibold text-center">
        <span className="border-b-4 rounded-full px-10 py-2">All Classes</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-20">
        {classes.map((classInfo, idx) => (
          <div
            key={idx}
            className="card card-compact w-11/12 mx-auto bg-base-100 shadow-xl">
            <figure>
              <img src={classInfo.image} />
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
                  onClick={() => handleSelectClass(classInfo)}
                  className="btn btn-block btn-neutral text-[16px]"
                  disabled={isAdmin || isInstructor}>
                  <FaBookmark /> Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
