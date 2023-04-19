import Slide1 from "./hero_components/Slide1";
import Slide2 from "./hero_components/Slide2";
import Slide3 from "./hero_components/Slide3";

import React, { useEffect, useState } from 'react'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const heroSlides = [<Slide1 key={1}/>, <Slide2 key={2}/>, <Slide3 key={3}/>]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev === 2) {
          return 0
        }
        return prev + 1
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      {heroSlides[currentSlide]}

      <div className="flex gap-2 justify-center mt-2">
        {heroSlides.map((it, id) => {
          return (
            <span onClick={() => setCurrentSlide(id)} className={`cursor-pointer block h-3 aspect-square rounded-full bg-bgAccent ${currentSlide !== id && "opacity-50"} transition-all duration-150`} key={id}></span>
          )
        })}
      </div>
    </div>
  )
}
