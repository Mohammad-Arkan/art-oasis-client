import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {Navigation} from "swiper/modules";
import {BsPersonCircle} from "react-icons/bs";
import {BiSolidQuoteLeft} from "react-icons/bi";
import {BiSolidQuoteRight} from "react-icons/bi";

const Testimonials = () => {
  return (
    <>
      <div className="mt-24 mb-16">
        <h1 className="text-3xl lg:text-4xl font-semibold text-center my-10">
          What our student says
        </h1>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          <SwiperSlide>
            <div className="flex flex-col items-center">
              <div className="card w-3/4 bg-base-200 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-3 justify-center">
                    {" "}
                    <BsPersonCircle />
                    Jhon Doe
                  </h2>
                  <p className="text-xl">
                    <BiSolidQuoteLeft className="inline" /> I'm a new student to
                    this summer camp learning site. I am learning how to draw
                    for last few months. Courses about perspective has added a
                    new level of experience in my learning.{" "}
                    <BiSolidQuoteRight className="inline" />
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col items-center">
              <div className="card w-3/4 bg-base-200 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-3 justify-center">
                    {" "}
                    <BsPersonCircle />
                    Charli Mark
                  </h2>
                  <p className="text-xl">
                    <BiSolidQuoteLeft className="inline" /> These courses are
                    really awesome. Not too much expensive to buy. Really a
                    value for money and time. Drawing for a long time. But the
                    course of color grading has brought life to my art.
                    Instructors are really friendly. It was a great experience
                    to discover this summer camp.{" "}
                    <BiSolidQuoteRight className="inline" />
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col items-center">
              <div className="card w-3/4 bg-base-200 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-3 justify-center">
                    {" "}
                    <BsPersonCircle />
                    Adam Smith
                  </h2>
                  <p className="text-xl">
                    <BiSolidQuoteLeft className="inline" /> Before starting this
                    course my thinking was that anime art is too much hard. I
                    did two course from here. One is how to draw anime and
                    second one is how to color anime art. Both were really cool.
                    Now I can do by myself{" "}
                    <BiSolidQuoteRight className="inline" />
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Testimonials;
