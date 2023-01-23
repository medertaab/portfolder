import React, { useState } from "react";
import Image from "next/image";

export default function Thumbnail(props) {
  const {
    image,
    setEdit,
    edit,
    index,
    handleAddEdit,
    pageOwner,
    setOpenImage,
  } = props;

  const [hover, setHover] = useState(false);

  function handleEdit(e) {
    e.stopPropagation()
    console.log('hoi')
  }

  function handleMouseEnter(e) {
    setHover(true)
  }

  return (
    <div onClick={() => setOpenImage(image)} className="relative h-[400px] cursor-pointer border-2 border-blue-500" onMouseOver={handleMouseEnter} onMouseLeave={() => setHover(false)}>
      
      {pageOwner && (
        <i onClick={handleEdit} className={`fa-solid fa-pen-to-square absolute right-0 p-2 text-2xl cursor-pointer opacity-${hover ? 100 : 0} hover:text-bgAccent z-20`}></i>
      )}

      <div className={`absolute w-full h-full z-10 opacity-${hover ? '100' : '0'} bg-bgPrimary bg-opacity-30 flex justify-center items-center duration-150`}>
        <h3 className="text-lg bottom-0 font-bold">{image.title}</h3>
      </div>  
      
      <Image
        src={image.link}
        alt=""
        fill
        className="object-contain"
      />
    </div>
  );
}
