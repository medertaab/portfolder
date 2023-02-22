import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useForm } from "react-hook-form";
import LoaderAnimation from "../../LoaderAnimation";
import { updatePassword } from "firebase/auth";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";


export default function PasswordSettings(props) {
  const {setPage} = props
  const { currentUser } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false)
  const [didUpload, setDidUpload] = useState(false)
  const [error, setError] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    handleSubmit(handleChangePassword)()
  }

  async function handleChangePassword(data) {
    setError('')
    if (data.newPassword !== data.confirmPassword) {
      setError("Passwords don't match")
      return
    }
    const credential = EmailAuthProvider.credential(currentUser.email, data.oldPassword)
    setLoading(true)
    await reauthenticateWithCredential(currentUser, credential)
      .then(() => {
        updatePassword(currentUser, data.newPassword)
          .then(() => {
            setDidUpload(true)
            setTimeout(() => {
              setDidUpload(false)
            }, 2000)
            setLoading(false)
          }).catch((error) => {
            setError(error.message)
          })
      }).catch(error => {
        setLoading(false)
        if (error.message.includes('auth/wrong-password')) {
          setError('Old password is incorrect')
        } else {
          setError(error.message)
        }
      })
  }

  return (
    <div className="px-1 sm:p-10 p-3 py-6 [&_label]:font-semibold">
      <button className="block py-2 text-2xl" onClick={() => setPage("main")}>
        <i className="fa-solid fa-arrow-left"></i>
      </button>

      <form>
        <label for="oldPassword">Enter old password</label>
        
        <input id="oldPassword" className="focus:outline-none w-full my-1 flex h-10 bg-bgSecondary rounded border-[1px] border-gray-400 items-center pl-2" type='password'
          {...register("oldPassword", {
            required: true,
            maxLength: {value: 1000},
            minLength: {value: 6, message: "Password should be at least 6 characters long"}
        })}/>
        <label for="newPassword">Enter new password</label>
        <input id="newPassword" className="focus:outline-none w-full my-1 flex h-10 bg-bgSecondary rounded border-[1px] border-gray-400 items-center pl-2" type='password'
          {...register("newPassword", {
            required: true,
            maxLength: {value: 1000},
            minLength: {value: 6, message: "Password should be at least 6 characters long"}
        })}/>
        <label for="confirmPassword">Confirm new password</label>
        <input id="confirmPassword" className="focus:outline-none w-full my-1 flex h-10 bg-bgSecondary rounded border-[1px] border-gray-400 items-center pl-2" type='password'
          {...register("confirmPassword", {
            required: true,
            maxLength: {value: 1000},
            minLength: {value: 6, message: "Password should be at least 6 characters long"}
        })}/>
        <div className='flex items-center'>
          <button
            button="submit"
            className="my-2 w-20 h-10 rounded border-2 border-bgAccent hover:bg-bgAccent duration-150"
            onClick={onSubmit}
          >
            {loading ? <LoaderAnimation small={true}/> : (didUpload ? <i className="text-lime-600 fa-solid fa-check"></i> : 'Submit')}
          </button>
          <span className="text-red-500 ml-1">
            {errors.oldPassword?.message}
            {errors.newPassword?.message}
          </span>
          {error && <span className="text-red-500 ml-1">{error}</span>}
        </div>
      </form>
    </div>
  )
}
