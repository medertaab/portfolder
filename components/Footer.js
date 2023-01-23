import React from 'react'
import { useAuth } from '../context/AuthContext'
import Link from 'next/link'

export default function Footer() {
  const {currentUser} = useAuth()
  return (
    <div className="text-sm border-t-2 border-bgSecondary h-14 flex flex-col justify-center items-center">
      {/* Sign up call for unregistered users */}
      <p>Made by @MT</p>
      {!currentUser && (
        <Link href="/login">
          <button className="duration-150 hover:text-textAccent">Start your own portfolio</button>
        </Link>
      )}
    </div>
  )
}
