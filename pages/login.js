import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import Login from "../components/login/Login";
import SignUp from "../components/login/SignUp";
import PageLayout from "../components/ui/PageLayout";
import Hero from "../components/login/Hero";


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
        <h1 className="text-3xl text-textAccent align-middle mb-2">🖼️ portfolder</h1>
        <p className="text-[1rem] italic mb-5 opacity-80 text-center px-2">
          Assemble a quick & compact portfolio to showcase your works
        </p>

        <div className="870:grid 870:grid-cols-[1fr,_400px] w-full max-w-[1100px]">
          <Hero />
          <div className="flex flex-col align-middle justify-center m-auto w-full 850:p-0 pt-5">
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
        </div>
      </div>
    </PageLayout>
  );
}
