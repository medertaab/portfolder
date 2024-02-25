import React, { useState, useEffect } from "react";
import LoaderAnimation from "../components/ui/LoaderAnimation";

export default function useCheckImage() {
  const [isValid, setIsValid] = useState(true);
  const [isValidLoading, setIsValidLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    checkImage("");
  }, []);

  async function checkImage(image) {
    setIsValidLoading(true);
    if (image === "" || !image) {
      setIsEmpty(true);
      setIsValidLoading(false);
      setIsValid(true);
      return;
    }

    setIsEmpty(false);
    await fetch(image, { method: "HEAD" })
      .then((res) => {
        return res.headers.get("Content-type").startsWith("image");
      })
      .then((res) => {
        setIsValid(res);
      })
      .catch((error) => {
        setIsValid(false);
      })
      .finally(setIsValidLoading(false));
  }

  function imageBox(image) {
    return (
      <>
        {isEmpty && !isValidLoading && (
          <div className="h-full aspect-square border-[1px] rounded-xl border-dashed border-textPrimary border-opacity-70 m-auto flex items-center">
            <p className="m-auto">No image</p>
          </div>
        )}

        {isValid && !isValidLoading && !isEmpty && (
          <img src={image} className="h-full m-auto" />
        )}

        {isValidLoading && (
          <div className="h-full aspect-square border-[1px] rounded-xl border-dashed border-textPrimary border-opacity-70 m-auto flex items-center">
            {<LoaderAnimation />}
          </div>
        )}

        {!isValid && !isValidLoading && !isEmpty && (
          <div className="h-full aspect-square border-[1px] rounded-xl border-dashed border-red-500 m-auto flex items-center">
            <p className="text-center p-5 m-auto">
              Could not get image :( Try another URL{" "}
            </p>
          </div>
        )}
      </>
    );
  }

  return {
    checkImage,
    isValid,
    isValidLoading,
    setIsValidLoading,
    isEmpty,
    imageBox,
  };
}
