import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useForm } from "react-hook-form";
import useCheckImage from "../../hooks/useCheckImage";
import useFilterUsername from "../../hooks/useFilterUsername";
import SubmitButton from "./SubmitButton"

export default function FirstSetup() {
  const [emailRepeat, setEmailRepeat] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");

  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const { isUsernameTaken  } = useFilterUsername()
  const {checkImage, isValid, setIsValidLoading, imageBox} = useCheckImage()
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();

  // Handle "same as account email" checkbox
  useEffect(() => {
    if (emailRepeat) {
      setValue("mainData.email", currentUser.email)
    } else if (!emailRepeat) {
      setValue("mainData.email", watch("mainData.email"))
    }
  }, [emailRepeat])
  
  // Handle image input change
  function handleIconChange(e) {
    setIsValidLoading(true)
    setTimeout(() => {
      checkImage(watch("mainData.icon"))
    }, 700)
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    handleSubmit(updateData)()
  }

  async function updateData(data) {
    // Check username
    const isTaken = await isUsernameTaken(data.username.toLowerCase())
    if (isTaken) {
      setError("Username is already in use")
      return
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
            grid: "dynamic"
          },
          description: {},
          images: {},
          socials: {}        
        },
        { merge: true }
      ).then(async () => {
        await updateProfile(currentUser, {
          displayName: data.username,
        }).catch((error) => {
          setError(error.message)
        })
      }).then(() => {
        router.push('/')
      }).catch((error) => {
        setError(error.message)
      }).finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="w-full py-4 text-sm flex flex-col items-center place-items-center justify-center gap-2 fade-in">
      <h1 className="text-3xl py-5">Welcome to your portfolio! 💌</h1>

      <form className="flex flex-col w-full max-w-lg px-4">
        <label for="username" className="text-center text-lg">
          Please choose a username:
          <p className="text-sm">(Your portfolio will be available at portfolder.com/{watch("username") || <i>username</i>})</p>
        </label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          className="outline-none text-base border-b-2 border-bgAccent p-2 pb-1 w-full mb-5 bg-bgSecondary"
          {...register("username", {
            required: "Username cannot be empty",
            pattern: {value: /^[A-Za-z][A-Za-z0-9_-]+$/, message: "Usernames can contain only letters, numbers or the '-'/'_' characters and should start with a letter or number" },
            maxLength: {value: 30, message: "Username should be less than 50 characters long"},
            minLength: {value: 2, message: "Username should be at least 2 characters long"},
            onChange: () => setError('')
          })}
        />
        {errors?.username && <span className="text-red-500 text-sm">{errors.username?.message}</span>}

        <h2 className="text-center text-lg pt-6">
          Add some information about yourself:
        </h2>
        <p className="text-center pb-6">
          (This is optional and can be added and edited later)
        </p>

        <label for="name" className="text-left w-full">
          Display name
          <span className="float-right">{watch("mainData.name")?.length || 0}/50</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your real or display name"
          className="outline-none text-base border-b-2 border-textPrimary border-opacity-70 p-2 pb-1 w-full mb-1 bg-bgSecondary"
          maxLength={50}
          {...register("mainData.name")}
        />

        <label for="title" className="text-left mt-4">
          Occupation
          <span className="float-right">{watch('mainData.title')?.length || 0}/50</span>
        </label>
        <input
          id="title"
          type="text"
          placeholder="'Illustration/concept art', 'Designer', etc"
          className="outline-none text-base border-b-2 border-textPrimary border-opacity-70 p-2 pb-1 w-full mb-1 bg-bgSecondary"
          maxLength={50}
          {...register("mainData.title")}
        />

        <label for="email" className="text-left mt-4 flex items-center">
          Contact email
          <span className="w-fit float-right flex items-center ml-auto">
            <label for="emailRepeat">Same as account email</label>
            <input type="checkbox" className="ml-1" checked={emailRepeat} onChange={(e) => setEmailRepeat(e.target.checked)}></input>
          </span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="Contact email for clients, recruiters etc."
          className="outline-none text-base border-b-2 border-textPrimary border-opacity-70 p-2 pb-1 w-full mb-1 bg-bgSecondary"
          value={watch("mainData.email")}
          {...register("mainData.email", {
            maxLength: {value: 200, message: "Please enter a valid email address"},
            minLength: {value: 5, message: "Please enter a valid email address"},
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Please enter a valid email address"
            }
          })}
        />
        {errors?.mainData?.email && <span className="text-red-500 text-sm">{errors.mainData?.email?.message}</span>}

        <label for="icon" className="text-left mt-4">
          Icon URL
        </label>
        <input
          id="icon"
          type="url"
          {...register("mainData.icon", {
            validate: () => isValid, 
            onChange: e => handleIconChange(e)
          })}
          placeholder="Link to your icon image"
          className="outline-none text-base border-b-2 border-textPrimary border-opacity-70 p-2 pb-1 w-full bg-bgSecondary"
        />

        {/* Image checker */}
        {imageBox(watch("mainData.icon"))}

        <SubmitButton
          onClick={onSubmit}
          loading={loading}
          disabled={!watch("username")}
          text="Submit"
        />
        <button type="button" onClick={logout} className="ml-auto mt-5 opacity-70">Log out</button>
      </form>
      {error && <div className="bg-red-400 px-2 py-1">{error}</div>}
    </div>
  );
}