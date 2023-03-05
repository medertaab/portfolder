import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useTheme } from "../context/ThemeContext";

export default function PageLayout({ children }) {
  const { theme } = useTheme();

  const fullHeightStyle = (
    <style global jsx>{`
      html,
      body,
      body > div:first-child,
      div#__next,
      div#__next > div {
        height: 100%;
      }
    `}</style>
  );

  return (
    <div
      className={`theme-${theme} theme-orange flex flex-col fade-in bg-bgPrimary text-textPrimary`}
    >
      <Navbar />
      <div className="grow flex items-center">
        {children}
      </div>
      <Footer />
      {fullHeightStyle}
    </div>
  );
}
