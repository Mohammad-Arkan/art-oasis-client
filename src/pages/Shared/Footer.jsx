import React from "react";
import {Fade} from "react-awesome-reveal";

const Footer = () => {
  return (
    <Fade>
      <footer className="footer p-10 bg-base-300 text-base-content">
        <div>
          <div className="flex items-center gap-2">
            <img width={30} src="/logo.png" alt="" />
            <h2 className="footer-title text-3xl ">Art Oasis</h2>
          </div>
          <p className="font-semibold">Designed & Developed By Zihadul Islam</p>
          <p>Copyright © 2023 - All Rights Reserved</p>
        </div>
        <div>
          <span className="footer-title">Pages</span>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">Classes</a>
          <a className="link link-hover">Instructor</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
    </Fade>
  );
};

export default Footer;
