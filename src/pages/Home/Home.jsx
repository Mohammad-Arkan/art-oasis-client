import React from "react";
import Banner from "./components/Banner";
import Instructors from "./components/Instructors";
import ApprovedClasses from "./components/ApprovedClasses";
import {
  Bounce,
  Fade,
  Flip,
  JackInTheBox,
  Roll,
  Slide,
  Zoom,
} from "react-awesome-reveal";

const Home = () => {
  return (
    <div>
      <Fade>
        <Banner />
        <ApprovedClasses />
        <Instructors />
      </Fade>
    </div>
  );
};

export default Home;
