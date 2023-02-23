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
import LoaderAnimation from "../LoaderAnimation";

export default function FirstSetup() {
  const [emailRepeat, setEmailRepeat] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");

  const { currentUser } = useAuth();
  const { isUsernameTaken  } = useFilterUsername()
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
  const {checkImage, isValid, isValidLoading, setIsValidLoading, isEmpty} = useCheckImage()

  const router = useRouter();

  useEffect(() => {
    if (emailRepeat) {
      setValue("mainData.email", currentUser.email)
    } else if (!emailRepeat) {
      setValue("mainData.email", watch("mainData.email"))
    }
  }, [emailRepeat])

  useEffect(() => {
    checkImage('')
  }, [])

  async function updateData(data) {
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        username: data.username,
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
    })
  }

  async function onSubmit(data) {
    setError('')
    if (!currentUser) {
      return;
    }

    setLoading(true)
    const isTaken = await isUsernameTaken(data.username)
    if (isTaken) {
      setError("Username is already in use")
    } else {
      updateData(data)
    }
    setLoading(false)
  }

  function handleIconChange(e) {
    setIsValidLoading(true)
    setTimeout(() => {
      checkImage(watch("mainData.icon"))
    }, 700)
  }

  return (
    <div className="bg-bgPrimary text-textPrimary min-h-[calc(100vh-2.5rem)] text-sm flex flex-col items-center place-items-center justify-center gap-2 fade-in">
      <h1 className="text-3xl py-5">Welcome to your portfolio! 💌</h1>

      <form className="flex flex-col w-full max-w-sm">
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
          className="outline-none text-base border-b-2 border-textPrimary border-opacity-70 p-2 pb-1 w-full mb-5 bg-bgSecondary"
          maxLength={50}
          {...register("mainData.name", {
            maxLength: 50
          })}
        />

        <label for="title" className="text-left">
          Occupation
          <span className="float-right">{watch('mainData.title')?.length || 0}/50</span>
        </label>
        <input
          id="title"
          type="text"
          placeholder="'Illustration/concept art', 'Designer', etc"
          className="outline-none text-base border-b-2 border-textPrimary border-opacity-70 p-2 pb-1 w-full mb-5 bg-bgSecondary"
          maxLength={50}
          {...register("mainData.title", {
            maxLength: 50
          })}
        />

        <label for="email" className="text-left flex items-center">
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
          className="outline-none text-base border-b-2 border-textPrimary border-opacity-70 p-2 pb-1 w-full mb-5 bg-bgSecondary"
          value={watch("mainData.email")}
          {...register("mainData.email", {
            maxLength: 200,
            onChange: () => setEmailRepeat(false)
          })}
          
        />
        
        <label for="icon" className="text-left">
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
          className="outline-none text-base border-b-2 border-textPrimary border-opacity-70 p-2 pb-1 w-full mb-5 bg-bgSecondary"
        />


      <div>
        {isEmpty && !isValidLoading && (
          <div className="my-10 border-2 rounded border-dashed border-textPrimary m-auto h-56 w-[10rem] flex items-center text-center">
            <p className='m-auto'>No profile picture</p>
          </div>
        )}
        {isValid && !isValidLoading && !isEmpty  && (
          <img src={watch("mainData.icon")} alt="user icon" className='h-56 mx-auto my-10'/>
        )}
        {isValidLoading && (
          <div className="my-10 border-2 rounded border-dashed border-textPrimary m-auto h-56 w-[10rem] flex items-center">
            {<LoaderAnimation />}
          </div>
        )}
        {!isValidLoading && !isValid && !isEmpty && (
          <div className="my-10 border-2 rounded border-dashed border-red-400 m-auto h-56 w-[10rem] flex items-center">
            <p className='text-center p-5'>Could not get image :( </p>
          </div>
        )}
      </div>


        <SubmitButton
          onClick={handleSubmit(onSubmit)}
          loading={loading}
          disabled={!watch("username")}
          text="Submit"
        />
      </form>

      {error && <div className="bg-red-400 px-2 py-1">{error}</div>}
    </div>
  );
}
