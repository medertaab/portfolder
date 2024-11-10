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
        min-height: 100vh;
      }
    `}</style>
  );


  return (
    <div
      className={`${figtree.className} theme-${theme} theme-purple flex flex-col fade-in bg-bgPrimary text-textPrimary h-full overflow-hidden`}
    >
      <Head>
        {props.title ? <title>{props.title} | PortFolder</title> : <title>PortFolder | Compact Portfolio Maker</title>}
        <meta name="description" content="Portfolder: Compact portfolio maker" />
        <meta name="image" property="og:image" content="/icon.png" />
        <meta name="keywords" content="Portfolio maker, Artist portfolio, Photographer portfolio, Online portfolio creator" />
        <link rel="icon" href="/portfolder_favicon.ico" type="image/x-icon" />
        <meta name="robots" content="index, follow" />
      </Head>

      <Navbar logo/>

      <main className="flex grow items-center max-w-screen-xl w-full m-auto bg-bgPrimary h-full ">
        {children}
      </main>

      <Footer />

      {fullHeightStyle}
    </div>
  );
}
