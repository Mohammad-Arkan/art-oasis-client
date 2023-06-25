import React from "react";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from "../../../assets/course1.jpg";
import img2 from "../../../assets/course2.jpg";
import img3 from "../../../assets/course3.jpg";
import img4 from "../../../assets/course4.jpg";
import img5 from "../../../assets/course5.jpg";

const Banner = () => {
  return (
    <div>
      <Carousel>
        <div>
          <img src={img1} />
        </div>
        <div>
          <img src={img2} />
        </div>
        <div>
          <img src={img3} />
        </div>
        <div>
          <img src={img4} />
        </div>
        <div>
          <img src={img5} />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;