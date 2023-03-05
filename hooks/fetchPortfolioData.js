import React, {useState, useEffect, useRef} from 'react'
import { doc, getDoc, getDocs, collection, query, where, limit } from 'firebase/firestore'
import { db } from '../firebase'
import { useRouter } from 'next/router'

export default function useFetchPortfolioData(username) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [portfolioData, setPortfolioData] = useState(null)
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const usersRef = collection(db, "users");
        const dataQuery = query(usersRef, where("username", "==", username), limit(1));
        const querySnapshot = await getDocs(dataQuery);
        if (querySnapshot.docs[0]) {
          setPortfolioData(querySnapshot.docs[0].data())
        } else {
          router.push('/404')
          return
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return {setPortfolioData, loading, error, portfolioData}
}