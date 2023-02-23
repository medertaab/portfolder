import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useTheme } from "../context/ThemeContext";

export default function PageLayout({ children }) {
  const { theme } = useTheme();
  return (
    <div
      className={`theme-${theme} theme-orange fade-in full-screen flex flex-col bg-bgPrimary text-textPrimary duration-150`}
    >
      <Navbar />
      <div className="grow justify-center">{children}</div>
      <Footer />
    </div>
  );
}
