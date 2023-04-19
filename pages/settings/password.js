import SettingsLayout from "../../components/settings/SettingsLayout";
import React from 'react'
import PasswordSettings from "../../components/settings/accountSettings/PasswordSettings";

export default function password() {
  return (
    <SettingsLayout>
      <PasswordSettings />
    </SettingsLayout>
  )
}
