import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import SubmitButton from '../SubmitButton'

export default function SignUp() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  async function submitHandler(e) {
    e.preventDefault();
    setError("");
    handleSubmit(async (data) => {
      setLoading(true);
      await signup(data.email, data.password)
        .then(() => {
          router.push("/setup");
        })
        .catch((error) => {
          setLoading(false);
          if (error.message.includes("auth/email-already-in-use")) {
            setError("An account with this email address already exists");
          } else {
            setError(error.message);
          }
        });
    })();
  }

  return (
    <form className="flex flex-col w-full max-w-xs fade-in">
      <h2 className="font-bold text-3xl m-auto">Sign up</h2>

      <label for="emailInput" className="max-w-fit text-left">
        Email
      </label>
      <input
        id="emailInput"
        type="email"
        placeholder="Email address"
        {...register("email", {
          required: true,
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "Please enter a valid email address",
          },
          maxLength: {
            value: 200,
            message: "Please enter a valid email address",
          },
          onChange: () => setError('')
        })}
        className="outline-none bg-bgSecondary text-base p-2 w-full mb-5 border-b-2 border-bgAccent"
      />

      <label for="passwordInput" className="text-left">
        Password
      </label>
      <input
        id="passwordInput"
        type="password"
        placeholder="Password"
        {...register("password", {
          required: true,
          maxLength: 1000,
          minLength: {
            value: 6,
            message: "Password should be at least 6 characters long",
          },
          onChange: () => setError('')
        })}
        className="outline-none bg-bgSecondary text-base p-2 w-full mb-5 border-b-2 border-bgAccent"
      ></input>

      <SubmitButton
        onClick={submitHandler}
        loading={loading}
        disabled={!watch("email") || !watch("password")}
        text="Sign up"
      />

      <span className="text-center text-red-400 mt-4">
        {errors.email?.message}
      </span>
      <span className="text-center text-red-400">
        {errors.password?.message}
      </span>
      <span className="text-center text-red-400">{error}</span>
    </form>
  );
}
