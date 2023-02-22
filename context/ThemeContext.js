import React, { useContext, useState } from "react";


const AuthContext = React.createContext()

export function useTheme() {
  return useContext(AuthContext)
}

export function ThemeProvider({children}) {
  const [theme, setTheme] = useState('light')

  function toggleTheme() {
    if (theme == 'light') {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
    } else if (theme == 'dark') {
      setTheme('light')
      localStorage.setItem('theme', 'light')
    }
  }

  const value = {theme, toggleTheme, setTheme}

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}