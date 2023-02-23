import React from 'react'
import { useAuth } from '../context/AuthContext'
import Link from 'next/link'
import { useTheme } from '../context/ThemeContext'
import { useRouter } from 'next/router'

export default function Footer() {
  const {currentUser} = useAuth()
  const {theme} = useTheme()
  const router = useRouter()

  return (
    <footer className={`theme-${theme} bg-bgPrimary text-textPrimary text-sm border-t-2 border-bgSecondary p-3 flex items-center justify-center gap-20`}>
      {/* Sign up call for unregistered users */}
      <p className=''>Made by @MT</p>
      {!currentUser && router.asPath !== "/login" && (
        <Link href="/login">
          <button className="border-b-2 px-1 border-bgPrimary duration-150 hover:border-bgAccent">Start your own portfolio</button>
        </Link>
      )}
    </footer>
  )
}
