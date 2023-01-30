import React from 'react'
import Login from '../components/Login'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'

export default function LoginPage() {
  const {currentUser, theme} = useAuth()

  const router = useRouter()
  if (currentUser && currentUser.displayName) {
    router.push('/')
  }

  return (
    <div className={`theme-${theme} h-screen`}>
      <Navbar />
      <Login />
    </div>
    
  )
}
