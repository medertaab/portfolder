import React, { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { useForm } from "react-hook-form";
import LoaderAnimation from "../../ui/LoaderAnimation"
import { deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { useRouter } from 'next/router'
import Link from 'next/link';

export default function DeleteAccount() {
  const router = useRouter()
  const { currentUser } = useAuth()
  const { register, handleSubmit } = useForm();

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    handleSubmit(handleDelete)()
  }

  async function handleDelete(data) {
    setLoading(true)
    const credential = EmailAuthProvider.credential(currentUser.email, data.password)
    await reauthenticateWithCredential(currentUser, credential)
      .then(() => {
        deleteUser(currentUser)
        .then(() => {
          setLoading(false)
          setSuccess(true)
          setTimeout(() => {
            router.push('/')
          }, 1500)
        })
        .catch((error) => {
          setError(error.message)
        })
      }).catch((error) => {
        setLoading(false)
        if (error.message.includes('auth/wrong-password')) {
          setError('Password is incorrect')
        } else {
          setError(error.message)
        }
      })
  }

  return (
    <div className="max-w-[40rem] m-auto sm:p-10 p-3 py-6 [&_label]:font-semibold">
      <Link href="/settings" className="py-2 mb-8 flex items-center w-fit">
        <i className="fa-solid fa-arrow-left mr-2 text-lg h-5"></i> Account settings
      </Link>

      <form>
        <p className="text-red-500 mb-4">This action is non-reversible and all your information will be permanently deleted. Are you sure you want to delete your account?</p>
        
        <label for="password">Confirm by entering your password</label>
        
        <input id="password" className="focus:outline-none w-full my-1 flex h-10 bg-bgSecondary rounded border-[1px] border-gray-400 items-center pl-2" type='password'
          {...register("password", {
            required: true,
            maxLength: {value: 1000}
        })}/>
        <div className='flex items-center'>
          <button
            id="username"
            button="submit"
            className="w-44 h-11 mt-4 ml-auto rounded-full bg-bgAccent text-primaryLight"
            onClick={onSubmit}
          >
            {loading ? <LoaderAnimation small={true}/> : (success ? <i className="text-lime-600 fa-solid fa-check"></i> : 'Delete account')}
          </button>
          {error && <span className="text-red-500 ml-2">{error}</span>}
        </div>
      </form>

    </div>
  )
}
