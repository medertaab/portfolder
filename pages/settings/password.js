import SettingsLayout from "../../components/ui/SettingsLayout";
import React from 'react'
import PasswordSettings from "../../components/settings/accountSettings/PasswordSettings";

export default function password() {
  return (
    <SettingsLayout>
      <PasswordSettings />
    </SettingsLayout>
  )
}
