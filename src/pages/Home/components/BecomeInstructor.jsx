import React from "react";
import instructor from "../../../assets/instructor.jpg";

const BecomeInstructor = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-5 py-5">
      <img src={instructor} alt="persons-image" />
      <div className="flex flex-col gap-5 mx-5">
        <h2 className="text-3xl font-semibold">Become an instructor</h2>
        <p className="text-xl lg:w-[80%]">
          Instructors from around the world teach millions of students on
          ArtOasis. We provide the tools and skills to teach what you love.
        </p>
        <div>
          <button className="btn btn-outline text-[17px]">
            Start Teaching Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default BecomeInstructor;
