import React from "react";

const Qna = () => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-3xl text-center my-10 font-semibold">
        Frequently asked questions (FAQ)
      </h2>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          Q1. What kind of drawing courses do you offer?
        </div>
        <div className="collapse-content">
          <p className="text-xl">
            <b>Ans:</b> We offer a wide range of drawing courses, including
            beginner, intermediate, and advanced levels. Our courses cover
            various styles and techniques, such as portrait drawing, landscape
            drawing, digital art, and more.
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          Q2. How can I purchase a drawing course?
        </div>
        <div className="collapse-content">
          <p className="text-xl">
            <b>Ans:</b> To purchase a drawing course, simply browse our course
            catalog, select the course you're interested in, and click on the
            "Enroll" or "Buy Now" button. Follow the on-screen instructions to
            complete the purchase.
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          Q3. Are the drawing courses suitable for beginners?
        </div>
        <div className="collapse-content">
          <p className="text-xl">
            <b>Ans:</b> Yes, we have courses specifically designed for
            beginners. These courses provide step-by-step guidance and cover the
            fundamental principles of drawing to help you get started with
            confidence.
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          Q4. Can I access the courses on any device?
        </div>
        <div className="collapse-content">
          <p className="text-xl">
            <b>Ans:</b> Absolutely! Our courses are accessible on a wide range
            of devices, including computers, tablets, and smartphones. You can
            learn at your own pace from wherever you're most comfortable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Qna;
