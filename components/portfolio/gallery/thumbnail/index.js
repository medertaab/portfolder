import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Thumbnail(props) {
  const { portfolioData, pageOwner, id, modalRef } = props;

  const [hover, setHover] = useState(false);
  const [landscape, setLandscape] = useState(false);

  const image = portfolioData.images[id];
  const grid = portfolioData.settings.grid;

  const router = useRouter()

  function openModal() {
    document.body.style.overflow = "hidden";
    
    router.replace({
      query: {username: router.query.username, work: image.title, id: id}
    }, undefined,
    { scroll: false })
    modalRef.current.showModal()
  }

  // Handle landscape images
  function handleLoad(e) {
    if (grid === "static") {
      setLandscape(false);
    } else if (grid === "dynamic") {
      const aspectRatio = e.target.naturalWidth / e.target.naturalHeight;
      if (aspectRatio >= 1.33) {
        setLandscape(true);
      }
    }
  }

  return (
    <li>
      <figure
        onClick={openModal}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`relative w-full ${
          grid === "static" ? "aspect-square" : "h-full"
        } cursor-pointer ${landscape && "landscape"}`}
      >
        {pageOwner && (
          <i
            className={`fa-solid fa-pen-to-square absolute right-0 p-2 text-2xl cursor-pointer opacity-${
              hover ? 100 : 0
            } hover:text-bgAccent z-20`}
          ></i>
        )}

        <figcaption
          className={`hidden sm:flex h-full w-full absolute z-10 bg-primaryDark bg-opacity-40 justify-center items-center ${
            hover ? "opacity-100" : "opacity-0"
          } duration-150`}
        >
          <h3 className="text-primaryLight text-xl bottom-0 font-bold drop-shadow-2xl text-shadow box-border object-contain">
            {image.title}
          </h3>
        </figcaption>

        <div className={`${grid === "static" ? "h-[350px]" : "h-[450px]"}`}>
          <img
            src={image.link}
            alt={image.title}
            className={`w-full h-full object-cover`}
            onLoad={handleLoad}
          ></img>
        </div>
      </figure>
    </li>
  );
}
