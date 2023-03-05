import React from "react";
import PageLayout from "../components/PageLayout";
import PaswordReset from "../components/login/PasswordReset";

export default function passwordreset() {
  return (
    <PageLayout title="Reset password">
      <PaswordReset />
    </PageLayout>
  );
}
