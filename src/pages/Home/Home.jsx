import React from "react";
import Banner from "./components/Banner";
import Instructors from "./components/Instructors";
import ApprovedClasses from "./components/ApprovedClasses";
import {Fade} from "react-awesome-reveal";
import {Helmet} from "react-helmet-async";
import UpcomingClasses from "./components/UpcomingClasses";

const Home = () => {
  return (
    <div>
      <Fade>
        <Helmet>
          <title>Art Oasis &#10003;</title>
        </Helmet>
        <Banner />
        <ApprovedClasses />
        <Instructors />
        <UpcomingClasses />
      </Fade>
    </div>
  );
};

export default Home;
