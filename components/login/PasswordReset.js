import React, { useState } from "react";
import Link from "next/link";
import SubmitButton from "./SubmitButton";
import { useForm } from "react-hook-form";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function PaswordReset() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const auth = getAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function submitHandler(e) {
    e.preventDefault();
    handleSubmit(resetPassword)();
  }

  function resetPassword(data) {
    setLoading(true);
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        if (error.message.includes("(auth/user-not-found)")) {
          setError("Sorry, we couldn't find an account with this email");
        } else {
          setError(error.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div
      className={`w-full text-sx sm:text-sm flex flex-col items-center justify-center p-5`}
    >
      <Link href="/login" className="p-2 mx-auto text-2xl">
        <i className="fa-solid fa-arrow-left"></i>
      </Link>

      <h2 className="text-2xl mb-5 text-textAccent align-middle">
        🖼️ portfolder
      </h2>
      <form className="flex flex-col w-full max-w-md">
        <label for="emailInput" className="max-w-fit text-left text-base">
          Enter your account&apos;s email address
        </label>

        <span className="text-red-500 mt-2">{errors?.email?.message}</span>

        <input
          id="emailInput"
          type="email"
          placeholder="Email address"
          {...register("email", {
            required: true,
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "(Please enter a valid email address)",
            },
            maxLength: {
              value: 200,
              message: "(Please enter a valid email address)",
            },
          })}
          className="outline-none bg-bgSecondary text-base p-2 w-full mb-5 border-b-2 border-bgAccent"
        />

        <SubmitButton
          onClick={submitHandler}
          loading={loading}
          disabled={!watch("email") || success}
          text={success ? "✓ Reset email sent! " : "Send reset email"}
        />

        {error && <span className="text-red-500">{error}</span>}
      </form>
    </div>
  );
}
