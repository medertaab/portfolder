import React, { useEffect, useState } from "react";
import LoaderAnimation from "../ui/LoaderAnimation"
import useFetchImages from "../../hooks/fetchImages";
import { useRouter } from "next/router";
import Link from "next/link";

export default function FullImageModal() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const username = router.query.username
  const [imageIndex, setImageIndex] = useState(router.query.id)

  const { images } = useFetchImages(username);
  const image = images?.[imageIndex]

  function handleNextClick(e) {
    e.stopPropagation()
    const nextImageIndex = Object.keys(images).indexOf(imageIndex) + 1
    if (nextImageIndex >= Object.keys(images).length) return
    const nextImageId = Object.keys(images)[nextImageIndex]
    setImageIndex(nextImageId)
  }

  function handlePrevClick(e) {
    e.stopPropagation()
    const prevImageIndex = Object.keys(images).indexOf(imageIndex) - 1
    if (prevImageIndex < 0) return
    const prevImageId = Object.keys(images)[prevImageIndex]
    setImageIndex(prevImageId)
  }

  useEffect(() => {
    if (image) {
      router.push(`/${username}/${image.title}?id=${imageIndex}`, undefined, {shallow: true})
    }
  }, [imageIndex])

  if (!images) {
    return
  }

  return (
    <div
      className="fixed z-40 inset-0 max-h-full max-w-full bg-bgPrimary bg-opacity-80 backdrop-blur-md flex flex-col items-center justify-center"
    >
      {/* Close modal button */}
      <Link
        href={`/${username}`}
        className="absolute top-8 z-30 right-0 p-5 cursor-pointer "
      >
        <i className="fa-solid fa-xmark text-3xl hover:text-bgAccent"></i>
      </Link>

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
      <div className={`fade-in h-fit sm:h-3/4 flex items-center self-center`} onClick={(e) => e.stopPropagation()}>
        {loading && <LoaderAnimation />}
        <img
          alt={image.title}
          src={image.link}
          className="fade-in h-full object-contain fade-in"
          style={{display: loading ? "none" : "block"}}
          onLoad={() => setLoading(false)}
        />
      </div>
      <h2 className="text-xl mt-4">{image.title}</h2>
    </div>
  );
}
