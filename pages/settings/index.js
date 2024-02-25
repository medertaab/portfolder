import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import useFetchPortfolioData from "../../hooks/fetchPortfolioData";
import { useTheme } from "../../context/ThemeContext";
import LoaderAnimation from "../../components/ui/LoaderAnimation";
import SettingsLayout from "../../components/ui/SettingsLayout";
import SettingsPage from "../../components/settings"; 
import UsernameSettings from "../../components/settings/accountSettings/UsernameSettings";
import EmailSettings from "../../components/settings/accountSettings/EmailSettings";
import PasswordSettings from "../../components/settings/accountSettings/PasswordSettings";
import DeleteAccount from "../../components/settings/accountSettings/DeleteAccount";

export default function Settings() {
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
        <SettingsLayout title="Account settings">
          <LoaderAnimation />
        </SettingsLayout>
      </div>
    )
  }

  return (
    <div className={`theme-${theme} theme-${portfolioData?.settings?.theme} bg-bgPrimary text-textPrimary`}>
      <SettingsLayout title="Account settings">
        {page === "main" && <SettingsPage setPage={setPage}/>}
        {page === "username" && <UsernameSettings setPage={setPage}/>}
        {page === "email" && <EmailSettings setPage={setPage}/>}
        {page === "password" && <PasswordSettings setPage={setPage}/>}
        {page === "deleteAccount" && <DeleteAccount setPage={setPage}/>}
      </SettingsLayout>
    </div>
  )
}
