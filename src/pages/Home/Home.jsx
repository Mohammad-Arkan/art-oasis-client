import React from "react";
import Banner from "./components/Banner";
import Instructors from "./components/Instructors";
import ApprovedClasses from "./components/ApprovedClasses";

const Home = () => {
  return (
    <div>
      <Banner />
      <ApprovedClasses />
      <Instructors />
    </div>
  );
};

export default Home;
