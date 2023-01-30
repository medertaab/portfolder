import React, { useState } from "react";
import Image from "next/image";

export default function Thumbnail(props) {
  const {
    image,
    setEdit,
    pageOwner,
    setOpenImage,
    setUpdatingImage,
    setUpdatingNum,
    num
  } = props;

  const [hover, setHover] = useState(false);

  function handleOpenImage() {
    setOpenImage(image)
  }

  function handleUpdateImage(e) {
    e.stopPropagation()
    setUpdatingImage(image)
    setUpdatingNum(num)
  }

  function handleMouseEnter(e) {
    setHover(true)
  }

  return (
    <div 
      onClick={handleOpenImage} onMouseOver={handleMouseEnter} onMouseLeave={() => setHover(false)}
      className="relative w-[minmax(200px,1fr)] cursor-pointer" 
    >      
      {pageOwner && (
        <i onClick={handleUpdateImage} className={`fa-solid fa-pen-to-square absolute right-0 p-2 text-2xl cursor-pointer opacity-${hover ? 100 : 0} hover:text-bgAccent z-20`}></i>
      )}

      <div className={`h-full w-full absolute z-10 opacity-${hover ? '100' : '0'} bg-bgPrimary bg-opacity-30 flex justify-center items-center duration-150`}>
        <h3 className="text-lg bottom-0 font-bold drop-shadow-2xl text-shadow">{image.title}</h3>
      </div>  
      
      <img src={image.link} alt="" className="w-full h-auto"/>
    </div>
  );
}
