import React from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext"
import { useRouter } from "next/router";
import FirstSetup from "../components/login/FirstSetup";
import PageLayout from "../components/PageLayout";

export default function Setup() {
  const {currentUser} = useAuth()
  const router = useRouter()

  if (!currentUser) {
    router.push('/');
  } else if (currentUser && currentUser.displayName) {
    router.push(`/manage`)
  } else {
    return (
      <PageLayout title="Welcome!">
        <FirstSetup />
      </PageLayout>
    );
  }
}
