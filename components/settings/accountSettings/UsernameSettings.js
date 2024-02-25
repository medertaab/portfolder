import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { useAuth } from '../../../context/AuthContext'
import { useForm } from "react-hook-form";
import useUpdateData from '../../../hooks/useUpdateData';
import LoaderAnimation from "../../ui/LoaderAnimation"
import useFilterUsername from "../../../hooks/useFilterUsername";
import Link from 'next/link';

export default function UsernameSettings(props) {
  const router = useRouter()
  const { currentUser, updateUser } = useAuth()
  const { isUsernameTaken  } = useFilterUsername()
  const {updateData, updateLoading, updateError} = useUpdateData()
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();


  const [loading, setLoading] = useState(false)
  const [isTaken, setIsTaken] = useState(false)
  const [success, setSuccess] = useState(false)

  // Display current username
  useEffect(() => {
    reset({username: currentUser.displayName})
  }, [])

  function onSubmit(e) {
    e.preventDefault();
    handleSubmit(handleUpdateUsername)()
  }
  
  async function handleUpdateUsername(data){
    setLoading(true)
    setIsTaken(false)
    if (await isUsernameTaken(data.username.toLowerCase())) {
      setIsTaken(true)
      setLoading(false)
      return
    } else {
      await updateUser({displayName: data.username.toLowerCase()})
      await updateData(data)
      setSuccess(true)
      setTimeout(() => {
        router.reload()
      }, 1000)
    }
    setLoading(false)
  }

  return (
    <div className="max-w-[40rem] m-auto sm:p-10 p-3 py-6 [&_label]:font-semibold">
      <Link href="/settings" className="py-2 mb-8 flex items-center w-fit">
        <i className="fa-solid fa-arrow-left mr-2 text-lg h-5"></i> Account settings
      </Link>

      <form>
        <label for="usernameInput">Change username</label>
        <span className={`float-right w-14 text-center ${errors.mainData?.title && "text-red-500"}`}>{watch("username") ? watch("username").length : 0}/30</span>
        
        <div className="w-full mt-1 flex h-10 bg-bgSecondary rounded border-[1px] border-gray-400 items-center pl-2">
          <label for="usernameInput" className="w-fit h-full flex items-center pr-0.5 text-gray-500">portfolder.com/</label>
          <input id="usernameInput" className="bg-bgSecondary grow focus:outline-none" type='text' {...register("username", {
            required: "Username cannot be empty",
            pattern: {value: /^[A-Za-z][A-Za-z0-9_-]+$/, message: "Usernames can contain only letters, numbers or the '-'/'_' characters and should start with a letter or number" },
            maxLength: {value: 30, message: "Username should be less than 50 characters long"},
            minLength: {value: 2, message: "Username should be at least 2 characters long"},
            validate: (value) => (value !== currentUser.displayName),
            onChange: () => setIsTaken(false)
          })}/>
        </div>
        <div className='flex items-center'>
          <button
            id="username"
            button="submit"
            className="w-24 h-11 mt-4 ml-auto rounded-full bg-bgAccent text-primaryLight"
            onClick={onSubmit}
          >

            {loading ? <LoaderAnimation small={true}/> : (success ? <i className="text-white fa-solid fa-check"></i> : 'Submit')}
          </button>

          {(errors.username?.message || updateError) && (
            <span className="text-red-500 ml-1">{errors.username?.message || updateError}</span>
          )}

          <span className="text-red-500 ml-1">{isTaken && "Username is already taken, please choose another one"}</span>
        </div>
      </form>
    </div>
  )
}
