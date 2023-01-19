import React from 'react'
import Login from '../components/Login'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const {currentUser} = useAuth()

  const router = useRouter()
  if (currentUser && currentUser.displayName) {
    router.push('/')
  }

  return (
    <div className='bg-gray-500 h-screen'>
      <Login />
    </div>
    
  )
}
