import React from 'react'
import HeroImage from '../../../svg/HeroImage'
import Drawings from '../../../svg/Drawings'
import Underline from '../../../svg/Underline'

export default function Hero({openModal}) {
  return (
    <div className="flex flex-col lg:flex-row items-center min-h-[80vh] h-full">
    <div className="relative flex flex-col gap-6 text-center lg:text-left lg:max-w-[50%] z-0 h-full mt-10 sm:mt-0 fade-in" style={{opacity: 0, animationDelay: "250ms"}}>
      <h2 className="text-4xl sm:text-6xl">
        Assemble a portfolio page - fast and easy
      </h2>
      <h3 className="text-xl relative">
        Just <span className="text-bgAccent relative">link your images <span className="absolute z-30 top-6 left-1 scale-125 text-textPrimary w-full animate-reveal"><Underline /></span></span> and
        they will appear on your page. That’s it!
      </h3>
      <div className="flex gap-2 mt-2 mx-auto lg:mx-0">
        <button
          title="Open sign up pop-up window"
          onClick={() => openModal("signup")}
          className="text-lg p-1 px-8 rounded-full bg-bgAccent text-primaryLight transition ease-in-out hover:-translate-y-1"
        >
          Create Page
        </button>
        <button
          title="Open log in pop-up window"
          onClick={() => openModal("login")}
          className="text-lg p-1 px-8 rounded-full border-[1px] border-textPrimary transition ease-in-out hover:-translate-y-1"
        >
          Log In
        </button>
      </div>
      <div className="absolute -top-[50%] -left-[5rem] size-[17rem] bg-gradient-to-br from-golden from-[25%] blur-[26px] to-transparent rounded-full -z-10 animate-spin" style={{animationDelay: "1s"}}></div>
    </div>

    <div className="relative h-full lg:w-1/2 z-0 sm:mt-10 lg:mt-0 [&>*:first-child]:scale-[87%] max-w-full fade-in" style={{opacity: 0, animationDelay: "500ms"}}>
      <HeroImage />
      <Drawings />
      <div className="absolute -bottom-11 -right-10 size-[17rem] bg-gradient-to-br from-bgAccent from-[20%] blur-[26px] to-transparent rounded-full -z-10 rotate-180 animate-spin"></div>
    </div>
  </div>
  )
}
