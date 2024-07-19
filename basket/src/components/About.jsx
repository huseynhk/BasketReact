import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AboutCompany from "./AboutCompany";
import AboutUs from "./AboutUs";
import { useLocation } from "react-router-dom";

const About = () => {
  const location = useLocation();
  const pathname = location.pathname;
  console.log("location", location);
  console.log("pathname", pathname);

  return (
    <>
      <div>
        <h3 className="text-gray-100 mx-2">About Page </h3>
        <Link className="text-gray-100 mx-2" to="company">
          Company
        </Link>
        <Link className="text-gray-100 mr-2" to="us">
          AboutUs
        </Link>
      </div>
      <Routes>
        <Route path="company" element={<AboutCompany />} />
        <Route path="us" element={<AboutUs />} />
      </Routes>
    </>
  );
};

export default About;
