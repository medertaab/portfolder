import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import useFetchPortfolioData from "../hooks/fetchPortfolioData";
import { useTheme } from "../context/ThemeContext";
import LoaderAnimation from "../components/ui/LoaderAnimation";
import SettingsLayout from "../components/ui/SettingsLayout";
import ManagePage from "../components/manage";

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
      <div
        className={`theme-${theme} theme-${portfolioData?.settings?.theme} bg-bgPrimary text-textPrimary`}
      >
        <SettingsLayout title="Manage page">
          <LoaderAnimation />
        </SettingsLayout>
      </div>
    );
  }

  return (
    <div
      className={`theme-${theme} theme-${portfolioData?.settings.theme} bg-bgPrimary text-textPrimary`}
    >
      <SettingsLayout title="Manage page">
        <ManagePage
          portfolioData={portfolioData}
          setPortfolioData={setPortfolioData}
        />
      </SettingsLayout>
    </div>
  );
}
