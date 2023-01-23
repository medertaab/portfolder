import React from 'react'
import Gallery from './Gallery'
import Header from './Header'
import InfoBlock from './InfoBlock'

export default function Layout({children}) {
  return (
    <div className="text-center">
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
