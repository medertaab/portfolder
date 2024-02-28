import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavigationButtons from "./NavigationButtons";

export default function ImageModal(props) {
  const { portfolioData, modalRef, pageOwner } = props;

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

  function handleUpdateWork() {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, action: "edit", type: "update" },
    });
  }

  function handleDeleteWork() {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, action: "edit", type: "delete" },
    });
  }

  return (
    <dialog
      onClick={(e) => handleClickOutside(e)}
      ref={modalRef}
      className=" w-full bg-transparent backdrop:bg-black backdrop:opacity-50"
    >
      <button
        type="button"
        onClick={closeModal}
        className="absolute z-40 right-2 p-5 cursor-pointer "
      >
        <i className="fa-solid fa-xmark text-3xl text-primaryLight"></i>
      </button>

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

      {pageOwner && (
        <div className="flex gap-1 m-auto max-w-[900px] w-full text-primaryLight justify-end text-sm pr-4">
          <button
            type="button"
            onClick={handleUpdateWork}
            className="px-2 py-1 rounded-full hover:bg-white hover:bg-opacity-10 transition ease-out w-20"
          >
            <i class="fa-regular fa-pen-to-square"></i> Edit
          </button>
          <button 
          type="button"
          onClick={handleDeleteWork}
          className="px-2 py-1 rounded-full hover:bg-white hover:bg-opacity-10 transition ease-out w-20">
            <i class="fa-solid fa-trash"></i> Delete
          </button>
        </div>
      )}

      <NavigationButtons portfolioData={portfolioData} router={router} />
    </dialog>
  );
}
