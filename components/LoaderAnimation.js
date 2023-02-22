import React from "react";

export default function LoaderAnimation(props) {
  const {small} = props
  if (small) {
    return (
      <div className="animate-spin text-xl flex justify-center">
        <i className="ri-loader-4-line"></i>
      </div>
    )
  } else return (
    <div className={`animate-spin-slow w-fit h-fit flex m-auto self-center p-5 border-none`}>
      <div className={`loader w-fit h-fit ${small && "scale-50"}`}></div>
    </div>
  )
}