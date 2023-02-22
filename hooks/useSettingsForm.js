import React, { useEffect, useState } from 'react'

export default function useSettingsForm(forms) {
  
  const [currentForm, setCurrentForm] = useState('')
  const [currentId, setCurrentId] = useState(0)
  const [form, setForm] = useState(null)

  const titles = ['display', 'socials', 'description']

  useEffect(() => {
    setCurrentForm('display')
  }, [])

  useEffect(() => {
    setForm(forms.filter(form => form.props.title === currentForm))
    setCurrentId(titles.indexOf(currentForm))
  }, [currentForm])

  return { form, currentId, setCurrentForm, currentForm }
}
