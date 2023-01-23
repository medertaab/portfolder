import React, {useState} from 'react'
import Image from 'next/image'
import LoaderAnimation from './LoaderAnimation'

export default function ShowImageModal(props) {
  const {openImage, setOpenImage} = props
  const [isImageReady, setIsImageReady] = useState(false)

  function handleLoading(e) {
    setIsImageReady(true)
  }

  return (
    <div className='fixed z-30 inset-0 bg-bgPrimary flex flex-col'>
      <button onClick={() => setOpenImage(null)} className="absolute top-0 z-30 right-0 p-3 cursor-pointer">
        <i  className="fa-solid fa-xmark text-2xl text-text"></i>
      </button>

      <div className='h-full border-2'>
        {!isImageReady && <LoaderAnimation />}
        <div className='relative h-5/6'>
          <Image
            alt={openImage.title}
            src={openImage.link}
            fill
            className="object-contain"
            onLoad={handleLoading}
          />
        </div>
        <h2 className='text-xl p-4'>{openImage.title}</h2>
      </div>
    </div>
  )
}
