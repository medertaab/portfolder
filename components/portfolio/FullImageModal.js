import React, { useState } from "react";
import Image from "next/image";

export default function FullImageModal(props) {
  const { openImage, setOpenImage } = props;

  function handleClick(e) {
    setOpenImage(null);
  }

  const blurPlaceholder = <div className="w-full h-full animate-pulse"></div>

  return (
    <div
      onClick={handleClick}
      className="fixed z-40 inset-0 max-h-full max-w-full bg-bgPrimary bg-opacity-80 backdrop-blur-md flex flex-col items-center justify-center"
    >
      <button
        onClick={() => setOpenImage(null)}
        className="absolute top-0 z-30 right-0 p-5 cursor-pointer"
      >
        <i className="fa-solid fa-xmark text-3xl hover:text-bgAccent"></i>
      </button>

      <div className="h-fit sm:h-3/4" onClick={(e) => e.stopPropagation()}>
        <Image
          alt={openImage.title}
          src={openImage.link}
          fill
          className="h-full object-contain"
          quality={100}
        />
      </div>
      <h2 className="text-xl p-4">{openImage.title}</h2>
    </div>
  );
}
