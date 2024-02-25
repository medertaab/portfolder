import SettingsLayout from "../../components/ui/SettingsLayout";
import React from 'react'
import UsernameSettings from "../../components/settings/accountSettings/UsernameSettings";

export default function username() {
  return (
    <SettingsLayout>
      <UsernameSettings />
    </SettingsLayout>
  )
}
