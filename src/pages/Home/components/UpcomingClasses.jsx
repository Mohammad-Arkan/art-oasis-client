import React from "react";
import Marquee from "react-fast-marquee";
import img1 from "../../../assets/im1.jpg";
import img2 from "../../../assets/im2.png";
import img3 from "../../../assets/im3.jpg";

const UpcomingClasses = () => {
  return (
    <>
      <h2 className="text-3xl font-semibold text-center mt-24 mb-20">
        <span className="border-b-4 rounded-full px-10 py-2">
          Upcoming Classes
        </span>
      </h2>

      <Marquee>
        <div className="flex gap-10 bg-base-100 mx-5 mb-20">
          <img width={500} className="rounded-lg shadow-xl" src={img1} />
          <img width={500} className="rounded-lg shadow-xl" src={img2} />
          <img width={500} className="rounded-lg shadow-xl" src={img3} />
        </div>
      </Marquee>
    </>
  );
};

export default UpcomingClasses;
