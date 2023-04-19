import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useForm } from "react-hook-form";
import { updateEmail} from "firebase/auth";
import useReauthenticate from "../../../hooks/useReauthenticate"
import LoaderAnimation from "../../ui/LoaderAnimation";
import Link from "next/link";

export default function EmailSettings() {
  const { currentUser } = useAuth()
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const {reauthenticateUser, isReauthenticated, authError} = useReauthenticate()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [didUpload, setDidUpload] = useState(false)
  const [isReauthenticating, setIsReauthenticating] = useState(false)
  const [password, setPassword] = useState('')

  // Set input to user email
  useEffect(() => {
    reset({email: currentUser.email})
  }, [])

 function onSubmit(e) {
    e.preventDefault();
    handleSubmit(handleEmailUpdate)()
  }

  async function handleEmailUpdate(data) {
    setLoading(true)
    setError('')
    if (isReauthenticating || !isReauthenticated) {
      await reauthenticateUser(password)
    }
    await updateEmail(currentUser, data.email)
      .then(() => {
        setDidUpload(true)
        setTimeout(() => {
          setDidUpload(false)
        }, 2000)
        setLoading(false)
      }).catch((error) => {
        setLoading(false)
        if (error.message.includes('auth/requires-recent-login')) {
          setIsReauthenticating(true)
          return
        } else {
          setError(error.message)
        }
      })
  }

  return (
    <div 
      className="sm:p-10 p-3 py-6 [&_label]:font-semibold"
    >
      <Link href="/settings" className="block py-2 text-2xl">
        <i className="fa-solid fa-arrow-left"></i>
      </Link>

      <form>
        <label for="emailInput">Set email address</label>
        
        <div className="w-full mt-1 flex h-10 bg-bgSecondary rounded border-[1px] border-gray-400 items-center pl-2">
          <input id="emailInput" className="bg-bgSecondary grow focus:outline-none" type='email'
            {...register("email", {
            required: "Email address cannot be empty",
            maxLength: {value: 200, message: "Please enter a valid email address"},
            minLength: {value: 5, message: "Please enter a valid email address"},
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Please enter a valid email address"
            },
            validate: (value) => (value !== currentUser.email)
          })}/>
        </div>
        {isReauthenticating && (
          <>
            <label for="passwordInput">Please re-enter your password:</label>
            <input id="passwordInput" type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus:outline-none w-full mt-1 flex h-10 bg-bgSecondary rounded border-[1px] border-gray-400 items-center pl-2"
            />
            <p className="text-red-500">{authError}</p>
          </>
        )}
        <div className='flex items-center'>
          <button
            button="submit"
            className="my-2 w-20 h-10 rounded border-2 border-bgAccent hover:bg-bgAccent duration-150"
            onClick={onSubmit}
          >
            {loading ? <LoaderAnimation small={true}/> : (didUpload ? <i className="text-lime-600 fa-solid fa-check"></i> : 'Submit')}
          </button>
          
          <span className="text-red-500 ml-2">{errors.email?.message}</span>
          {error && <span className="text-red-500 ml-2">{error}</span>}
        </div>
      </form>
    </div>
  )
}
