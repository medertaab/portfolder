import React, { useState, useEffect } from "react";
import Header from "./Header";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import Gallery from "./Gallery";
import Description from "./Description";
import PortfolioSkeleton from "./PortfolioSkeleton";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import useFetchPortfolioData from "../../hooks/fetchPortfolioData";

export default function Portfolio(props) {
  const { username, publicMode } = props;
  const { currentUser } = useAuth();
  const { theme, setTheme } = useTheme()
  const [pageOwner, setPageOwner] = useState(false);

  useEffect(() => {
    if (publicMode) {
      setPageOwner(false)
      return
    }
    
    if (currentUser && username == currentUser.displayName) {
      setPageOwner(true);
    } else {
      return
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      setTheme(localStorage.getItem('theme'))
    }
  }, [])

  // Returns all public data for the user: {loading, error, portfolioData}
  const {portfolioData, loading, error} = useFetchPortfolioData(username);

  if (loading) return (
    <div className={`theme-${theme} theme-${portfolioData?.settings.theme} text-center flex-1 relative w-full max-w-screen-xl min-h-screen flex flex-col m-auto bg-bgPrimary text-textPrimary duration-100 grid-flow-dense`}>
      <Navbar />
      <PortfolioSkeleton />
      <Footer />
    </div>
  ) 

  return (
    <div className={`theme-${theme} theme-${portfolioData?.settings.theme} text-center flex-1 relative w-full max-w-screen-2xl min-h-screen flex flex-col m-auto bg-bgPrimary text-textPrimary duration-100 grid-flow-dense`}>
      <Navbar />
      {error && <h1>Something went wrong ({error}). Please try reloading.</h1>}
      {portfolioData && (
        <div className="fade-in-medium">
          <Header pageOwner={pageOwner} portfolioData={portfolioData} />
          <Gallery pageOwner={pageOwner} username={username} grid={portfolioData.settings.grid}/>
          <Description pageOwner={pageOwner} portfolioData={portfolioData} />
          <Footer />
        </div>
      )}
    </div>
  );
}
