import React, { useState } from "react";
import Image from "next/image";

export default function Thumbnail(props) {
  const { image, setEdit, edit, index, handleAddEdit } = props;
  const [hover, setHover] = useState(false)
  
  return (
    <>
      {!edit && (
        <div className="relative h-64" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <div className={`${hover ? "opacity-100" : "opacity-0"}`}>
            <i onClick={handleAddEdit(index)}className={`fa-solid fa-pen-to-square hidden icon-shadow absolute z-10 right-0 p-2 text-white text-xl duration:150 cursor-pointer`}></i>
          </div>
          <Image src={image} alt="" layout={'fill'} objectFit={'contain'} />
        </div>
      )}
      {edit && (
        <div className="relative h-64 grid place-items-center" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <form className="z-20 absolute">
            <input placeholder="New image link" className="opacity-100"></input>
            <button type="button" className="z-20 w-fit bg-amber-300 text-black">Submit</button>
          </form>
          <div className="absolute bg-black opacity-30 z-10 h-full w-full"></div>
          <Image className="" src={image} alt="" layout={'fill'} objectFit={'contain'} />
        </div>
      )}
    </>

  );
}
