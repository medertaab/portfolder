import React, {useState, useEffect} from 'react'
import { getDocs, collection, query, where, limit } from 'firebase/firestore'

import { db } from '../firebase'

export default function useFetchImages(username) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [images, setImages] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const usersRef = collection(db, "users");
        const dataQuery = query(usersRef, where("username", "==", username), limit(1));
        const querySnapshot = await getDocs(dataQuery);
        if ( querySnapshot.docs[0]) {
          setImages(querySnapshot.docs[0].data().images)
        }
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return {loading, error, images, setImages}
}