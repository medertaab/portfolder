import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import Login from "../components/login";
import SignUp from "../components/login/SignUp";
import PageLayout from "../components/ui/PageLayout";
import HeroCarousel from "../components/login/HeroCarousel";

export default function LoginPage() {
  const { currentUser } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [invisibleForm, setInvisibleForm] = useState(true);

  const router = useRouter();
  if (currentUser && currentUser.displayName) {
    router.push("/");
  }

  function switchLogin() {
    setInvisibleForm(false);
    setIsLoggingIn(true);
  }

  function switchSignUp() {
    setInvisibleForm(false);
    setIsLoggingIn(false);
  }

  return (
    <PageLayout title={isLoggingIn ? "Log in" : "Sign up"}>
      <div
        className={`w-full text-sx sm:text-sm flex flex-col items-center justify-center`}
      >
        <h1 className="text-3xl text-textAccent align-middle mb-2">
          🖼️ portfolder
        </h1>
        <p className="text-xs sm:text-[1rem] italic mb-5 opacity-80 text-center px-2">
          Assemble a quick & compact portfolio to showcase your works
        </p>

        {/* Wide view */}
        <div className="sm:block hidden  870:grid 870:grid-cols-[1fr,_400px] w-full max-w-[1100px]">
          <HeroCarousel />
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

        {/* Mobile view */}
        <div className="sm:hidden block w-full max-w-[1100px]">
          {invisibleForm && (
            <>
              <HeroCarousel />
              <div className="flex justify-center mt-4">
                <button
                  className="bg-bgAccent rounded w-20 py-1 text-bgPrimary font-medium mx-1"
                  onClick={switchLogin}
                >
                  Login
                </button>
                <button
                  className="bg-bgAccent rounded w-20 py-1 text-bgPrimary font-medium mx-1"
                  onClick={switchSignUp}
                >
                  Sign up
                </button>
              </div>
            </>
          )}
          {!invisibleForm && (
            <div className="sm:hidden flex flex-col align-middle justify-center m-auto w-full 850:p-0 pt-5">
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
          )}
        </div>
      </div>
    </PageLayout>
  );
}
