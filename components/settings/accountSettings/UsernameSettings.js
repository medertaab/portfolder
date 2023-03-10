import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { useAuth } from '../../../context/AuthContext'
import { useForm } from "react-hook-form";
import useUpdateData from '../../../hooks/useUpdateData';
import LoaderAnimation from "../../LoaderAnimation"
import useFilterUsername from "../../../hooks/useFilterUsername";

export default function UsernameSettings(props) {
  const {setPage} = props
  
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
    <div className="sm:p-10 p-3 py-6 [&_label]:font-semibold">
      <button className="block py-2 text-2xl" onClick={() => setPage("main")}>
        <i className="fa-solid fa-arrow-left"></i>
      </button>

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
            className="my-2 w-24 min-w-[6rem] h-10 rounded border-2 border-bgAccent hover:bg-bgAccent duration-150"
            onClick={onSubmit}
          >
            {loading ? <LoaderAnimation small={true}/> : (success ? <i className="text-lime-600 fa-solid fa-check"></i> : 'Submit')}
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
