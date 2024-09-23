import React from 'react'
import Link from 'next/link'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useRouter } from 'next/router'

export default function Footer() {
  const {currentUser} = useAuth()
  const {theme} = useTheme()
  const router = useRouter()
  const isMainPage = router.pathname == "/";

  return (
    <footer className={`theme-${theme} bg-bgPrimary text-textPrimary text-sm border-t-[1px] border-bgSecondary p-3 flex items-center justify-center gap-20 bottom-0 mt-10`}>
      <p className='opacity-30'>portfolder @ <Link href="http://medertaab.com/" className='underline'>medertaab</Link></p>
      {!currentUser && router.asPath !== "/login" && !isMainPage && (
        <Link href="/">
          <button className="border-b-2 px-1 border-bgPrimary duration-150 hover:border-bgAccent">Start your own portfolio</button>
        </Link>
      )}
    </footer>
  )
}
