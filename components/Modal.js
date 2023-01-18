import React from 'react'
import { useAuth } from "../context/AuthContext";

export default function Modal(props) {
  const {logout} = useAuth()
  const {setOpenModal} = props


  function logoutHandler() {
    logout()
    setOpenModal(false)
  }

  return (
    <div className='fixed z-30 inset-0 bg-white text-slate-900 flex flex-col'>
      <div className=''>
        <h1 onClick={() => setOpenModal(false)}>Menu</h1>
      </div>
      <div className=''>
        <h2 onClick={logoutHandler}>Logout</h2>
      </div>
      
    </div>
  )
}
