import Link from 'next/link';
import React from 'react'
import { useAuth } from "../context/AuthContext";
import { useRouter } from 'next/router';

export default function MenuModal(props) {
  const {currentUser, logout} = useAuth()
  const {setOpenModal} = props
  const router = useRouter()
  console.log(router)


  function logoutHandler() {
    logout()
    setOpenModal(false)
    router.reload(window.location.pathname)
  }

  return (
    <div className='menu-modal fixed z-40 h-full w-full max-w-md right-0 top-0 bg-bgPrimary flex flex-col gap-3 text-lg border-l-2'>
      <i onClick={() => setOpenModal(false)} className="fa-solid fa-xmark absolute top-0 right-0 text-2xl p-5 cursor-pointer hover:text-bgAccent duration-150"></i>

      <Link href="/" className="hover:text-orange-400 duration-150 ">Home</Link>
      <Link href={`/${currentUser.displayName}`}>Your page</Link>
      <Link href={`${router.asPath}/public`}>Public mode</Link>
      <Link href="/manage">Manage profile</Link>
      <Link href="/settings">Settings</Link>
      <h2 onClick={logoutHandler}>Logout</h2>
      
    </div>
  )
}
