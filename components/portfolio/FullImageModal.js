import React, { useState } from "react";

export default function FullImageModal(props) {
  const { images, imageIndex, setImageIndex } = props;
  const image = images[imageIndex]

  const [sliding, setSliding] = useState('')
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  
  const minSwipeDistance = 50 

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) nextImage()
    if (isRightSwipe) prevImage()
  }

  function nextImage() {
    const nextIndex = Object.keys(images).indexOf(imageIndex) + 1
    const nextImageNum = Object.keys(images)[nextIndex]
    if (images[nextImageNum]) {
      setSliding("right")
      setTimeout(() => {
        setSliding("")
        setImageIndex(nextImageNum)
      }, 250)
    }
  }

  function prevImage() {
    const prevIndex = Object.keys(images).indexOf(imageIndex) - 1
    const prevImageNum = Object.keys(images)[prevIndex]
    if (images[prevImageNum]) {
      setSliding("left")
      setTimeout(() => {
        setSliding("")
        setImageIndex(prevImageNum)
      }, 250)
    }
  }

  function handleNextClick(e) {
    e.stopPropagation()
    nextImage()
  }

  function handlePrevClick(e) {
    e.stopPropagation()
    prevImage()
  }

  return (
    <div
      onClick={() => setImageIndex(null)}
      className="fixed z-40 inset-0 max-h-full max-w-full bg-bgPrimary bg-opacity-80 backdrop-blur-md flex flex-col items-center justify-center"
      onTouchStart={onTouchStart} 
      onTouchMove={onTouchMove} 
      onTouchEnd={onTouchEnd}
    >
      {/* Close modal button */}
      <button
        onClick={() => setImageIndex(null)}
        className="absolute top-0 z-30 right-0 p-5 cursor-pointer"
      >
        <i className="fa-solid fa-xmark text-3xl hover:text-bgAccent"></i>
      </button>

      {/* Navigation buttons */}
      <div className="absolute flex z-40 justify-between w-full sm:max-w-5xl px-5">
        <button type="button" onClick={handlePrevClick} className="bg-bgPrimary text-textPrimary shadowy sm:text-6xl text-3xl bg-opacity-20 rounded-full h-10 w-10 sm:h-14 sm:w-14 sm:hover:bg-textPrimary sm:hover:bg-opacity-50 sm:hover:text-white duration-150 flex items-center justify-center">
          <i className="ri-arrow-left-s-line sm:mr-0.5"></i>
        </button>
        <button type="button" onClick={handleNextClick} className="bg-bgPrimary text-textPrimary shadowy sm:text-6xl text-3xl bg-opacity-20 rounded-full h-10 w-10 sm:h-14 sm:w-14 sm:hover:bg-textPrimary sm:hover:bg-opacity-50 sm:hover:text-white duration-150 flex items-center justify-center">
          <i className="ri-arrow-right-s-line ml-[10%]"></i>
        </button>
      </div>

      {/* Image (with additional div for even flex center of image*/}
      <div className="mb-4"></div>
      <div className={`fade-in h-fit sm:h-3/4 flex items-center self-center ${sliding && `sliding-${sliding}`}`} onClick={(e) => e.stopPropagation()}>
        <img
          alt={image.title}
          src={image.link}
          className="h-full object-contain fade-in"
        />
      </div>
      <h2 className="text-xl mt-4">{image.title}</h2>
    </div>
  );
}
