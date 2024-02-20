import React from "react";
import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useTheme } from "../../context/ThemeContext";
import { Figtree } from "next/font/google"
const figtree = Figtree({ subsets: ["latin"]});

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
      className={`${figtree.className} theme-${theme} theme-purple flex flex-col fade-in bg-bgPrimary text-textPrimary`}
    >
      <Head>
        {props.title ? <title>{props.title} | PortFolder</title> : <title>PortFolder | Compact Portfolio Maker</title>}
        <meta name="description" content="Portfolder: Compact portfolio maker" />
      </Head>

      <Navbar logo/>

      <main className="flex items-center max-w-screen-xl m-auto">
        {children}
      </main>

      <Footer />

      {fullHeightStyle}
    </div>
  );
}
