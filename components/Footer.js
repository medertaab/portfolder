import React from 'react'
import { useAuth } from '../context/AuthContext'
import Link from 'next/link'

export default function Footer() {
  const {currentUser} = useAuth()
  return (
    <div className="text-sm border-t-2 border-bgSecondary h-14 flex items-center justify-center gap-20">
      {/* Sign up call for unregistered users */}
      <p>Made by @MT</p>
      {!currentUser && (
        <Link href="/login">
          <button className="border-b-2 px-1 border-bgPrimary duration-150 hover:border-bgAccent">Start your own portfolio</button>
        </Link>
      )}
    </div>
  )
}
