import React, { useState } from "react";
import Link from "next/link";
import SubmitButton from './SubmitButton'
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";

export default function Login() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  function submitHandler(e) {
    e.preventDefault();
    handleSubmit(async (data) => {
      try {
        setLoading(true);
        await login(data.email, data.password);
      } catch {
        setLoading(false);
        setError("Incorrect email or password");
      }
      return;
    })();
  }

  return (
    <form className="flex flex-col w-full max-w-xs fade-in m-auto">
      <h2 className="font-bold text-2xl m-auto">Log in</h2>

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
          onChange: () => setError('')
        })}
        className="outline-none bg-bgSecondary text-base p-2 w-full mb-5 border-b-2 border-bgAccent"
      ></input>

      <SubmitButton
        onClick={submitHandler}
        loading={loading}
        disabled={!watch("email") || !watch("password")}
        text="Login"
      />

      <span className="text-center text-red-400 mt-4">
        {errors.email?.message}
        {error}
      </span>

      <Link
        href="/passwordreset"
        className="underline m-auto mt-4 hover:text-textAccent duration-100"
      >
        Forgot password?
      </Link>
    </form>
  );
}
