import React, { useState, useEffect } from "react";
import Header from "./Header";
import InfoBlock from "./InfoBlock";
import Layout from "../components/Layout";
import Gallery from "./Gallery";
import LoaderAnimation from "./LoaderAnimation";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import useFetchPortfolioData from "../hooks/fetchPortfolioData";
import Footer from "./Footer";

export default function Portfolio(props) {
  const { username } = props;
  const { currentUser, theme, setTheme } = useAuth();
  const [pageOwner, setPageOwner] = useState(false);

  useEffect(() => {
    if (currentUser && username == currentUser.displayName) {
      setPageOwner(true);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      setTheme(localStorage.getItem('theme'))
    }
  }, [])

  // Returns all public data for the user: {loading, error, portfolioData}
  const {portfolioData, setPortfolioData, loading, error} = useFetchPortfolioData(username);



  return (
    <div className={`theme-${theme} relative w-full max-w-screen-xl min-h-screen flex flex-col m-auto bg-bgPrimary text-textPrimary `}>
      <Layout>
        <Navbar />
        {error && <h1>Error</h1>}
        {loading && <LoaderAnimation />}
        {!loading && (
          <>
            <Header pageOwner={pageOwner} portfolioData={portfolioData} />
            <Gallery pageOwner={pageOwner} portfolioData={portfolioData} setPortfolioData={setPortfolioData}/>
            <InfoBlock pageOwner={pageOwner} portfolioData={portfolioData} />
            <Footer />
          </>
        )}
      </Layout>
    </div>
  );
}
