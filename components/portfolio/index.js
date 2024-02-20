import React, { useState, useEffect, useRef } from "react";
import Header from "./header";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import Gallery from "./gallery";
import Description from "./description";
import Skeleton from "./skeleton";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import useFetchPortfolioData from "../../hooks/fetchPortfolioData";

export default function Portfolio(props) {
  const { username, publicMode } = props;
  const { currentUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const [pageOwner, setPageOwner] = useState(false);
  const [addingImage, setAddingImage] = useState(false);

  // Returns all public data for the user: {loading, error, portfolioData}
  const { portfolioData, loading, error } = useFetchPortfolioData(username);

  useEffect(() => {
    if (publicMode) {
      setPageOwner(false);
      return;
    }

    if (currentUser && username == currentUser.displayName) {
      setPageOwner(true);
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"));
    }
  }, []);

  if (loading)
    return (
      <div
        className={`theme-${theme} theme-${portfolioData?.settings.theme} flex-1 relative w-full max-w-screen-xl min-h-screen flex flex-col m-auto bg-bgPrimary text-textPrimary duration-100 grid-flow-dense`}
      >
        <Navbar />
        <Skeleton />
        <Footer />
      </div>
    );

  return (
    <div
      className={`theme-${theme} theme-${portfolioData?.settings.theme} flex-1 relative w-full max-w-screen-2xl min-h-screen flex flex-col m-auto bg-bgPrimary text-textPrimary duration-100 grid-flow-dense`}
    >
      <Navbar
        pageOwner={pageOwner}
        addingImage={addingImage}
        setAddingImage={setAddingImage}
      />

      {error && (
        <h2 className="text-center">
          Something went wrong, error: {error.message ? error.message : "uknown"}. Please try
          reloading.
        </h2>
      )}

      {portfolioData && (
        <div className="fade-in-medium">
          <Header pageOwner={pageOwner} portfolioData={portfolioData} />
          <Gallery
            pageOwner={pageOwner}
            portfolioData={portfolioData}
            addingImage={addingImage}
            setAddingImage={setAddingImage}
          />
          <Description pageOwner={pageOwner} portfolioData={portfolioData} />
          <Footer />
        </div>
      )}
    </div>
  );
}
