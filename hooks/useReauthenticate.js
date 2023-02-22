import React, {useState} from 'react'
import { useAuth } from '../context/AuthContext';
import { reauthenticateWithCredential, EmailAuthProvider} from "firebase/auth";

export default function useReauthenticate() {
  const { currentUser } = useAuth()
  const {isReauthenticated, setIsReauthenticated} = useState(false)
  const [authError, setAuthError] = useState('')

  async function reauthenticateUser(password) {
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password
    )
    await reauthenticateWithCredential(currentUser, credential)
    .then(() => {
      setIsReauthenticated(true)
    }).catch(error => {
      if (error.message.includes('auth/wrong-password')) {
        setAuthError('Password is incorrect')
      } else if (error.message.includes('auth/too-many-requests')) {
        setAuthError("Too many failed login attempts, please try again later")
      } else {
        setAuthError(error.message)
      }
    })
  }

  return {reauthenticateUser, isReauthenticated, authError}
}
