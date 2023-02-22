import React, { useState } from 'react'

export default function useCheckImage() {
  const [isValid, setIsValid] = useState(true)
  const [isValidLoading, setIsValidLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)

  async function checkImage(testImage) {
    setIsValidLoading(true)
    if (testImage === '' || !testImage) {
      setIsEmpty(true)
      setIsValidLoading(false)
      setIsValid(true)
      return
    }

    setIsEmpty(false)
    await fetch(testImage, {method: 'HEAD'})
      .then(res => {
        return res.headers.get('Content-type').startsWith('image')
      }).then(res => {
        setIsValid(res)
      }).catch(error => {
        setIsValid(false)
      }).finally(
        setIsValidLoading(false)
      )
  }

  return {checkImage, isValid, isValidLoading, setIsValidLoading, isEmpty}
}
