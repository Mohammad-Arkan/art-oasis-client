import React from "react";
import Marquee from "react-fast-marquee";
import img1 from "../../../assets/im1.jpg";
import img2 from "../../../assets/im2.png";
import img3 from "../../../assets/im3.jpg";

const UpcomingClasses = () => {
  return (
    <>
      <Marquee className="mt-24">
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
