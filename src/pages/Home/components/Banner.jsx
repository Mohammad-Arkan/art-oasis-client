import React from "react";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from "../../../assets/course6.jpg";
import img2 from "../../../assets/course2.jpg";
import img3 from "../../../assets/course3.jpg";
import img4 from "../../../assets/course4.jpg";

const Banner = () => {
  return (
    <div>
      <Carousel>
        <div>
          <img
            src={"https://i.ibb.co/L9dk1bS/spark-for-anime-art-promo-1.webp"}
          />
        </div>
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
      </Carousel>
    </div>
  );
};

export default Banner;
