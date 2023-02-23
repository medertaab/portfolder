import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useRouter } from "next/router";
import Login from "../components/login/Login";
import SignUp from "../components/login/SignUp";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const { currentUser } = useAuth();
  const { theme } = useTheme();
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const router = useRouter();
  if (currentUser && currentUser.displayName) {
    router.push("/");
  }

  return (
    <div className={`theme-${theme} h-screen fade-in`}>
      <Navbar />
      <div
        className={`border-2 border-red-500 theme-orange bg-bgPrimary h-[calc(100%-2.5rem)] flex-1 text-sx sm:text-sm flex flex-col items-center place-items-center justify-center gap-2 sm:gap-4 text-textPrimary`}
      >
        <h2 className="text-2xl mb-5 text-textAccent align-middle">🖼️ portfolder</h2>

        {isLoggingIn && <Login />}
        {!isLoggingIn && <SignUp />}

        <button
          onClick={() => setIsLoggingIn(!isLoggingIn)}
          className="cursor-pointer underline hover:text-textAccent duration-100"
        >
          {!isLoggingIn
            ? "Already registered? Log in"
            : <span>Not registered? <strong>Sign up</strong></span>}
        </button>
      </div>
    </div>
  );
}
