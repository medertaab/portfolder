import React, { useState } from "react";
import Link from "next/link";
import SubmitButton from "../ui/SubmitButton";
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
      className={`w-full max-w-[900px] m-auto sm:text-sm text-base flex flex-col items-center justify-center p-5`}
    >
      <Link href="/" className="p-2 mr-auto">
        <i className="fa-solid fa-arrow-left mr-2"></i> Back
      </Link>

      <form className="flex flex-col w-full max-w-md mt-8">
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
          className="outline-none w-full m-auto mb-4 px-2 bg-bgSecondary p-2 rounded text-textPrimary border-[1px] border-textPrimary"
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
