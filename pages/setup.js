import React from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext"
import { useRouter } from "next/router";
import FirstSetup from "../components/login/FirstSetup";
import Navbar from '../components/Navbar'

export default function Setup() {
  const {currentUser} = useAuth()
  const router = useRouter()
  const {theme} = useTheme()
  
  if (currentUser && currentUser.displayName) {
    router.push(`/${currentUser.displayName}`)
  } else {
    return (
      <div className={`theme-${theme} theme-orange`}>
        <Navbar small/>
        <FirstSetup />
      </div>
    );
  }
}
