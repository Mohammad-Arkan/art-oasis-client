import React from "react";
import {Helmet} from "react-helmet-async";
import useEnrolledClasses from "../../../hooks/useEnrolledClasses";

const EnrolledClasses = () => {
  const [enrolledClasses] = useEnrolledClasses();

  return (
    <div>
      <Helmet>
        <title>Art Oasis | Enrolled Classes</title>
      </Helmet>
      <h2 className="text-3xl font-semibold text-center mt-24 mb-20">
        <span className="border-b-4 rounded-full px-10 py-2">
          Enrolled Classes
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 my-20">
        {enrolledClasses.map((classInfo, idx) => (
          <div
            key={idx}
            className="card card-compact w-[88%] bg-base-100 shadow-xl mx-auto p-3 my-3">
            <figure>
              <img className="rounded-lg" src={classInfo.classImage} />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-xl">{classInfo.className}</h2>
              <p className="card-info">
                Instructor Name: {classInfo.instructorName}
              </p>
              <p className="card-info">
                Instructor Email: {classInfo.instructorEmail}
              </p>
              <button className="btn mt-4 text-[16px] btn-outline">
                Continue
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledClasses;
