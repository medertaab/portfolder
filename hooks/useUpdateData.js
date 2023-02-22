import React, { useState } from 'react'
import { doc, setDoc, updateDoc, deleteField, updateProfile } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from '../context/AuthContext';

export default function useUpdateData() {
  const [userData, setUserData] = useState(null)
  const [updateLoading, setUpdateLoading] = useState(false)
  const [didUpload, setDidUpload] = useState(false)
  const [updateError, setUpdateError] = useState('')
  const { currentUser } = useAuth();

  async function updateData(data) {
    if (!data) return;
    if (!currentUser) return;
    const userRef = doc(db, "users", currentUser.uid);
    try {
      setUpdateLoading(true)
      await setDoc(
        userRef,
        data,
        { merge: true }
      );
    } catch (err) {
      setUpdateError(err)
    } finally {
      setUpdateLoading(false)
      setDidUpload(true)
      setTimeout(() => {
        setDidUpload(false)
      }, 1500)
    }
  }
  return {updateData, updateLoading, updateError, didUpload}
}
