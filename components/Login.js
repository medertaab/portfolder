import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const { login, signup, currentUser } = useAuth();

  const router = useRouter();

  async function submitHandler() {
    if (!email || !password) {
      setError("Please enter email & password");
    } else {
      if (isLoggingIn) {
        try {
          await login(email, password);
        } catch {
          setError("Incorrect email or password");
        }
        return;
      } else {
        try {
          await signup(email, password);
        } catch {
          setError("Error");
        } finally {
          router.push("/setup");
        }
      }
    }
  }

  return (
    <div className="flex-1 h-full text-sx sm:text-sm flex flex-col items-center place-items-center justify-center gap-2 sm:gap-4  text-white">
      <h2 className="text-2xl mb-5">🖼️ portfolder</h2>

      <h2 className="font-bold text-3xl">
        {isLoggingIn ? "Log in" : "Sign Up"}
      </h2>

      <form className="flex flex-col w-full max-w-xs">
        <label for="signup-input-email" className="text-left">
          Email
        </label>
        <input
          id="signup-input-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail address"
          className="outline-nine text-slate-900 p-2 w-full mb-5 rounded"
        />

        <label for="signup-input-password" className="text-left">
          Password
        </label>
        <input
          id="signup-input-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="new-password"
          className="outline-nine text-slate-900 p-2 w-full mb-5 rounded"
        ></input>

        <button
          onClick={submitHandler}
          type="button"
          className="w-full border border-white border-solid py-2 duration-300 relative mb-5 rounded  hover:bg-white hover:text-slate-700"
        >
          {isLoggingIn ? "Login" : "Sign up"}
        </button>

        <h2
          onClick={() => setIsLoggingIn(!isLoggingIn)}
          className="py-2 cursor-pointer hover:underline  rounded"
        >
          {!isLoggingIn
            ? "Already registered? Log in"
            : "Not registered? Sign up"}
        </h2>
      </form>

      {error && <div className="bg-red-400 px-2 py-1">{error}</div>}
    </div>
  );
}
