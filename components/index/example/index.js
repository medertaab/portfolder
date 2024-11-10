import React, { useState, useEffect, useRef } from "react";
import Header from "../../portfolio/header";
import Gallery from "../../portfolio/gallery";
import { useTheme } from "../../../context/ThemeContext";
import data from "./data.json";

export default function Example() {
  const { theme } = useTheme();
  const portfolioData = data;

  return (
    <>
    <div className="flex flex-col text-center mt-32">
      <h3 className="text-3xl font-semibold ">See it in action</h3>
      <p className="text-lg mt-1">Here’s a live example of what you can create with Portfolder. See how your work could look in a few clicks:</p>
    </div>
      <div
        className={`theme-${theme} mt-14 flex-1 relative w-full 
      p-5 min-h-screen flex flex-col m-auto bg-bgPrimary text-textPrimary duration-100 grid-flow-dense border-[1px] border-textPrimary rounded-3xl shadow-[0px_0px_30px_0px] shadow-golden`}
      >
        {portfolioData && (
          <div className="fade-in-medium w-full max-w-screen-2xl m-auto">
            <Header portfolioData={portfolioData} />
            <Gallery portfolioData={portfolioData} />
          </div>
        )}
      </div>
    </>
  );
}
