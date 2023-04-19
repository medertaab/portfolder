import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Thumbnail(props) {
  const {
    image,
    pageOwner,
    setUpdatingImage,
    setUpdatingNum,
    num,
    grid
  } = props;
  const {asPath} = useRouter()

  const [hover, setHover] = useState(false);
  const [landscape, setLandscape] = useState(false)

  function handleUpdateImage(e) {
    e.stopPropagation()
    setUpdatingImage(image)
    setUpdatingNum(num)
  }

  function handleMouseEnter(e) {
    setHover(true)
  }

  // Handle landscape images
  function handleLoad(e){
    if (grid === 'static') {
      setLandscape(false)
    } else if (grid === 'dynamic') {
      const aspectRatio = e.target.naturalWidth / e.target.naturalHeight
      if (aspectRatio >= 1.33) {
        setLandscape(true)
      }
    }
  }

  return (
    <Link href={{pathname: `${asPath}/${image.title}`, query: {id: num}}} scroll={false}>
      <figure 
        onMouseOver={handleMouseEnter} onMouseLeave={() => setHover(false)}
        className={`relative w-full ${grid === "static" ? "aspect-square" : "h-full"} cursor-pointer ${landscape && 'landscape'}`} 
      >      
        {pageOwner && (
          <i onClick={handleUpdateImage} className={`fa-solid fa-pen-to-square absolute right-0 p-2 text-2xl cursor-pointer opacity-${hover ? 100 : 0} hover:text-bgAccent z-20`}></i>
        )}

        <figcaption className={`h-full w-full absolute z-10 opacity-${hover ? '100' : '0'} bg-bgPrimary bg-opacity-30 flex justify-center items-center duration-150`}>
          <h3 className="text-xl bottom-0 font-bold drop-shadow-2xl text-shadow box-border object-contain">{image.title}</h3>
        </figcaption>  

        <div className={`${grid === "static" ? "h-[350px]" : "h-[450px]"}`}>
          <Image src={image.link} alt="" fill className={`w-full h-full object-cover`} onLoad={handleLoad}/>
        </div>
      </figure>
    </Link>
  );
}