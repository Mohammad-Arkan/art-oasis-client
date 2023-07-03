import React from "react";
import useInstructor from "../../hooks/useInstructor";
import {Helmet} from "react-helmet-async";

const Instructors = () => {
  const [instructors] = useInstructor();
  return (
    <div>
      <>
        <Helmet>
          <title>Art Oasis | Instructor</title>
        </Helmet>
        <h2 className="text-center my-10 text-3xl font-semibold">
          <span className="border-b-4 rounded-full px-10 py-2">
            Instructors
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-11/12 mx-auto mb-20 mt-14">
          {instructors.map((instructor) => (
            <div
              className="card p-3  bg-base-100 shadow-xl"
              key={instructor._id}>
              <figure>
                <img
                  className="rounded-lg"
                  width={400}
                  src={instructor.image}
                />
              </figure>
              <div className="card-body p-5">
                <h2 className="card-title text-2xl">{instructor.name}</h2>
                <p className="text-xl">{instructor.email}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    </div>
  );
};

export default Instructors;
