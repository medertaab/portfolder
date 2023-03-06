import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import Login from "../components/login/Login";
import SignUp from "../components/login/SignUp";
import PageLayout from "../components/PageLayout";

export default function LoginPage() {
  const { currentUser } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const router = useRouter();
  if (currentUser && currentUser.displayName) {
    router.push("/");
  }

  return (
    <PageLayout title={isLoggingIn ? "Log in" : "Sign up"}>
      <div
        className={`w-full text-sx sm:text-sm flex flex-col items-center justify-center`}
      >
        <h2 className="text-2xl mb-5 text-textAccent align-middle">
          🖼️ portfolder
        </h2>

        {isLoggingIn && <Login />}
        {!isLoggingIn && <SignUp />}

        <button
          onClick={() => setIsLoggingIn(!isLoggingIn)}
          className="cursor-pointer underline hover:text-textAccent duration-100"
        >
          {!isLoggingIn ? (
            "Already registered? Log in"
          ) : (
            <span>
              Not registered? <strong>Sign up</strong>
            </span>
          )}
        </button>
      </div>
    </PageLayout>
  );
}
