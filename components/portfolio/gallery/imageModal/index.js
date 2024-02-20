import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CloseButton from "./CloseButton";
import NavigationButtons from "./NavigationButtons";

export default function ImageModal(props) {
  const { portfolioData, modalRef } = props;

  const router = useRouter();
  const { work, id } = router.query;
  const image = portfolioData.images[id];

  useEffect(() => {
    // Start with open modal if there are query params
    if (work && id) {
      modalRef.current.close();
      modalRef.current.showModal();
      document.body.style.overflow = "hidden";
    }
  }, []);

  function closeModal() {
    window.history.pushState({}, "", "/");
    modalRef.current.close();
    document.body.style.overflow = "unset";
  }

  function handleClickOutside(e) {
    if (e.target !== e.currentTarget) return;
    closeModal();
  }

  return (
    <dialog
      onClick={(e) => handleClickOutside(e)}
      ref={modalRef}
      className="relative w-full max-w-[100vw] max-h-[100vh] bg-transparent backdrop:bg-black backdrop:opacity-50"
    >
      <CloseButton onClick={closeModal} />

      <div
        className="flex flex-col w-fit m-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {id && work && (
          <>
            <img
              alt={image.title}
              src={image.link}
              className="h-[85vh] max-h-screen object-contain"
            />
            <h4 className="text-xl mt-4 text-primaryLight mx-auto [text-shadow:_0_2px_2px_rgb(0_0_0_/_50%)]">
              {image.title}
            </h4>
          </>
        )}
      </div>

      <NavigationButtons portfolioData={portfolioData} router={router} />
    </dialog>
  );
}
