import React, {useState, useEffect, useRef} from 'react'
import { doc, getDoc} from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'

export default function useFetchMainData() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mainData, setMainData] = useState(null)

  const { currentUser } = useAuth()

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, 'users', currentUser.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.data().mainData) {
          setMainData(docSnap.data().mainData)
        } else {
          setMainData({})
        }
      } catch (err) {
        setError('Failed to load main data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return {loading, error, mainData}
}