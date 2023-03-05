import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Router, { useRouter } from "next/router";
import PageSettings from "../components/settings/pageSettings/PageSettings";
import Navbar from "../components/Navbar";
import useFetchPortfolioData from "../hooks/fetchPortfolioData";
import { useTheme } from "../context/ThemeContext";
import LoaderAnimation from "../components/LoaderAnimation";
import SettingsLayout from "../components/settings/SettingsLayout";
import AccountSettings from "../components/settings/accountSettings/AccountSettings"; 
import UsernameSettings from "../components/settings/accountSettings/UsernameSettings";
import EmailSettings from "../components/settings/accountSettings/EmailSettings";
import PasswordSettings from "../components/settings/accountSettings/PasswordSettings";
import DeleteAccount from "../components/settings/accountSettings/DeleteAccount";

export default function SettingsPage() {
  const { currentUser } = useAuth();
  const { theme } = useTheme();
  const [page, setPage] = useState('main')
  const { portfolioData, loading, error } = useFetchPortfolioData(currentUser?.displayName);

  const router = useRouter()
  if (!currentUser) {
    router.push('/')
    return 
  }

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
    <div className={`theme-${theme} theme-${portfolioData?.settings?.theme} bg-bgPrimary text-textPrimary`}>
      <SettingsLayout>
        {page === "main" && <AccountSettings setPage={setPage}/>}
        {page === "username" && <UsernameSettings setPage={setPage}/>}
        {page === "email" && <EmailSettings setPage={setPage}/>}
        {page === "password" && <PasswordSettings setPage={setPage}/>}
        {page === "deleteAccount" && <DeleteAccount setPage={setPage}/>}
      </SettingsLayout>
    </div>
  )
}
