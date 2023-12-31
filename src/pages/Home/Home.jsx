import React from "react";
import Banner from "./components/Banner";
import Instructors from "./components/Instructors";
import ApprovedClasses from "./components/ApprovedClasses";
import {Fade} from "react-awesome-reveal";
import {Helmet} from "react-helmet-async";
import UpcomingClasses from "./components/UpcomingClasses";
import BecomeInstructor from "./components/BecomeInstructor";
import Testimonials from "./components/Testimonials";
import Qna from "./components/Qna";
import Newsletter from "./components/Newsletter";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Art Oasis &#10003;</title>
      </Helmet>
      <Fade>
        <Banner />
        <ApprovedClasses />
        <Instructors />
        <BecomeInstructor />
        <Testimonials />
        <Newsletter />
        <Qna />
        <UpcomingClasses />
      </Fade>
    </div>
  );
};

export default Home;
