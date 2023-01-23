import React from "react";
import FirstSetup from "../components/FirstSetup";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function Setup() {
  const {currentUser} = useAuth()
  const router = useRouter()
  
  if (currentUser && currentUser.displayName) {
    router.push(`/${currentUser.displayName}`)
  } else {
    return (
      <FirstSetup />
    );
  }
}
