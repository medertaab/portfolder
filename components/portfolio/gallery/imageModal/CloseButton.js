import React from 'react'

export default function CloseButton(props) {
  const {onClick} = props
  return (
    <button
    type="button"
    onClick={onClick}
    className="absolute z-40 right-2 p-5 cursor-pointer "
  >
    <i className="fa-solid fa-xmark text-3xl text-primaryLight"></i>
  </button>
  )
}
