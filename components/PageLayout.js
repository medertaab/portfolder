import React from "react";
import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useTheme } from "../context/ThemeContext";

export default function PageLayout(props) {
  const { children } = props
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
       <Head>
        <title>{props.title} | PortFolder</title>
        <meta name="description" content="Portfolder: Compact portfolio maker" />
      </Head>
      <Navbar />
      <div className="grow flex items-center">
        {children}
      </div>
      <Footer />
      {fullHeightStyle}
    </div>
  );
}
