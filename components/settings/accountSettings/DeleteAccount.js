import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { useForm } from "react-hook-form";
import LoaderAnimation from "../../LoaderAnimation"
import { getAuth, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

import { useRouter } from 'next/router'

export default function DeleteAccount(props) {
  const {setPage} = props
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors }, reset } = useForm();


  const router = useRouter()

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
    <div className="sm:p-10 p-3 py-6 [&_label]:font-semibold">
      <button className="block py-2 text-2xl" onClick={() => setPage("main")}>
        <i className="fa-solid fa-arrow-left"></i>
      </button>

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
            className="my-2 min-w-[6rem] w-36 h-10 rounded border-2 border-bgAccent hover:bg-bgAccent duration-150"
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
