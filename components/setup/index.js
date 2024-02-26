import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useForm } from "react-hook-form";
import useCheckImage from "../../hooks/useCheckImage";
import useFilterUsername from "../../hooks/useFilterUsername";
import SubmitButton from "../ui/SubmitButton";

export default function SetupPage() {
  const [emailRepeat, setEmailRepeat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const { isUsernameTaken } = useFilterUsername();
  const { checkImage, isValid, setIsValidLoading, imageBox } = useCheckImage();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  // Handle "same as account email" checkbox
  useEffect(() => {
    if (emailRepeat) {
      setValue("mainData.email", currentUser.email);
    } else if (!emailRepeat) {
      setValue("mainData.email", watch("mainData.email"));
    }
  }, [emailRepeat]);

  // Handle image input change
  function handleIconChange(e) {
    setIsValidLoading(true);
    setTimeout(() => {
      checkImage(watch("mainData.icon"));
    }, 700);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    handleSubmit(updateData)();
  }

  async function updateData(data) {
    // Check username
    const isTaken = await isUsernameTaken(data.username.toLowerCase());
    if (isTaken) {
      setError("Username is already in use");
      return;
    }
    // Update data
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        username: data.username.toLowerCase(),
        mainData: data.mainData,
        settings: {
          theme: "orange",
          grid: "dynamic",
        },
        description: {},
        images: {},
        socials: {},
      },
      { merge: true }
    )
      .then(async () => {
        await updateProfile(currentUser, {
          displayName: data.username,
        }).catch((error) => {
          setError(error.message);
        });
      })
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="w-full max-w-[700px] py-4 flex flex-col items-center place-items-center justify-center gap-2 fade-in m-auto">
      <p className="text-3xl py-5 text-center">
        Welcome to Portfolder! 👋
        <br /> Let&#39;s set up your page.
      </p>

      <form className="flex flex-col w-full px-4 [&_input]:px-2 [&_input[type=text]]:h-10 [&_input[type=email]]:h-10 [&_input]:bg-bgSecondary [&_input]:w-full [&_input]:border-[1px] [&_input]:rounded [&_input]:border-gray-400 [&_input]:mt-1 [&_input:focus]:outline-none text-base">
        <label for="username" className="">
          Please choose a username:
        </label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          maxLength={30}
          {...register("username", {
            required: "Username cannot be empty",
            pattern: {
              value: /^[A-Za-z][A-Za-z0-9_-]+$/,
              message:
                "Usernames can contain only letters, numbers or the '-'/'_' characters and should start with a letter or number",
            },
            maxLength: {
              value: 30,
              message: "Username should be less than 50 characters long",
            },
            minLength: {
              value: 2,
              message: "Username should be at least 2 characters long",
            },
            onChange: () => setError(""),
          })}
        />
        {errors?.username && (
          <span className="text-red-500 text-sm">
            {errors.username?.message}
          </span>
        )}
        <p className="text-sm mt-2 opacity-80">
          (Your portfolio will be available at portfolder.com/
          {watch("username") || <i>username</i>})
        </p>

        <span className="block h-[1px] bg-bgAccent w-52 m-auto mt-6"></span>

        <p className="mt-6 mb-2 text-center">
          Add some information to show on your page (optional):
        </p>

        <label for="name" className="text-left w-full">
          Display name
          <span className="float-right">
            {watch("mainData.name")?.length || 0}/50
          </span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your real or display name"
          maxLength={50}
          {...register("mainData.name")}
        />

        <label for="title" className="text-left mt-4">
          Occupation
          <span className="float-right">
            {watch("mainData.title")?.length || 0}/50
          </span>
        </label>
        <input
          id="title"
          type="text"
          placeholder="'Illustration/concept art', 'Designer', etc"
          maxLength={50}
          {...register("mainData.title")}
        />

        <label for="email" className="text-left mt-4 flex items-center">
          Contact email
          <span className="float-right ml-auto flex items-center">
            <label for="emailRepeat" className="text-nowrap text-sm">
              Same as account email
            </label>
            <input
              type="checkbox"
              className="ml-2 h-4 mb-1"
              checked={emailRepeat}
              onChange={(e) => setEmailRepeat(e.target.checked)}
            ></input>
          </span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="Contact email for clients, recruiters etc."
          value={watch("mainData.email")}
          {...register("mainData.email", {
            maxLength: {
              value: 200,
              message: "Please enter a valid email address",
            },
            minLength: {
              value: 5,
              message: "Please enter a valid email address",
            },
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Please enter a valid email address",
            },
          })}
        />
        {errors?.mainData?.email && (
          <span className="text-red-500 text-sm">
            {errors.mainData?.email?.message}
          </span>
        )}

        <label for="icon" className="text-left mt-4">
          Icon URL
        </label>
        <input
          id="icon"
          type="url"
          {...register("mainData.icon", {
            validate: () => isValid,
            onChange: (e) => handleIconChange(e),
          })}
          placeholder="Link to your icon image"
          className="outline-none text-base border-b-2 border-textPrimary border-opacity-70 p-2 pb-1 w-full bg-bgSecondary"
        />

        {/* Image checker */}
        <div className="h-[20rem] max-w-[100%] p-4 rounded-3xl [&_img]:rounded-3xl">
          {imageBox(watch("mainData.icon"))}
        </div>

        <SubmitButton
          onClick={onSubmit}
          loading={loading}
          disabled={!watch("username")}
          text="Submit"
        />
        <button
          type="button"
          onClick={logout}
          className="ml-auto mt-5 opacity-70"
        >
          Log out
        </button>
      </form>
      {error && <div className="bg-red-400 px-2 py-1">{error}</div>}
    </div>
  );
}
