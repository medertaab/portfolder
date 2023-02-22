import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import PageSettings from "../components/settings/pageSettings/PageSettings";
import Navbar from "../components/Navbar";
import useFetchPortfolioData from "../hooks/fetchPortfolioData";
import { useTheme } from "../context/ThemeContext";
import LoaderAnimation from "../components/LoaderAnimation";
import SettingsLayout from "../components/settings/SettingsLayout";

export default function ManageSettingsPage() {
  const { currentUser, logout } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();

  if (!currentUser) {
    router.push("/login");
  }

  const { setPortfolioData, loading, error, portfolioData } =
    useFetchPortfolioData(currentUser.displayName);

  if (loading) {
    return (
      <div className={`theme-${theme} theme-${portfolioData?.settings?.theme} bg-bgPrimary text-textPrimary`}>
        <SettingsLayout>
          <LoaderAnimation />
        </SettingsLayout>
      </div>
    )
  }

  return (
    <div className={`theme-${theme} theme-${portfolioData?.settings.theme} bg-bgPrimary text-textPrimary`}>
      <SettingsLayout>
        <PageSettings
          portfolioData={portfolioData}
          setPortfolioData={setPortfolioData}
        />
      </SettingsLayout>
    </div>
  );
}
