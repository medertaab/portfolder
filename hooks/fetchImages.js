import React, {useState, useEffect, useRef} from 'react'
import { doc, getDoc} from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'

export default function useFetchImages() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [images, setImages] = useState(null)

  const { currentUser } = useAuth()

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, 'users', currentUser.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setImages(docSnap.data().images)
        } else {
          setImages({})
        }
      } catch (err) {
        setError('Failed to load images')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return {loading, error, images}
}