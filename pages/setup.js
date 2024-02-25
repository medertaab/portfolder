import React from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import PageLayout from "../components/ui/PageLayout";
import SetupPage from "../components/setup";

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
        <SetupPage />
      </PageLayout>
    );
  }
}
