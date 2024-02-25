import SettingsLayout from "../../components/ui/SettingsLayout";
import React from 'react'
import EmailSettings from "../../components/settings/accountSettings/EmailSettings";

export default function email() {
  return (
    <SettingsLayout>
      <EmailSettings />
    </SettingsLayout>
  )
}
