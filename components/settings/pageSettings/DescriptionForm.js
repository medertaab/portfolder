import React from 'react'
import AboutMeForm from './AboutMeForm'


export default function DescriptionForm(props) {
  const {register, watch, setValues} = props

  return (
    <section className="w-full [&_input]:px-2 [&_input]:h-10 [&_input]:bg-bgSecondary [&_input]:w-full [&_input]:border-[1px] [&_input]:rounded [&_input]:border-gray-400 [&_input]:mt-1 [&_input:focus]:outline-none">
      <label for="infoImage">Custom image URL</label>
      <input type='URL' {...register("description.image")}></input>
 
      <label for="description">About you</label>
      <AboutMeForm {...props}/>
   </section>
  )
}
