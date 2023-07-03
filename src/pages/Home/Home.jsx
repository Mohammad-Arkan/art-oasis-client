import React from "react";
import Banner from "./components/Banner";
import Instructors from "./components/Instructors";
import ApprovedClasses from "./components/ApprovedClasses";
import {Fade} from "react-awesome-reveal";

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
