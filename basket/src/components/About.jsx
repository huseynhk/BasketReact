import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AboutCompany from "./AboutCompany";
import AboutUs from "./AboutUs";

const About = () => {


  return (
    <>
      <div>
        <Link className="text-gray-100 mr-2" to="company">Company</Link>
        <Link className="text-gray-100 mr-2" to="us">AboutUs</Link>
      </div>
      <Routes>
        <Route path="company" element={<AboutCompany />} />
        <Route path="us" element={<AboutUs />} />
      </Routes>
    </>
  );
};

export default About;
