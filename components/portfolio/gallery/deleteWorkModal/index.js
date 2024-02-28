import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import DeletForm from "./DeleteForm";

export default function DeleteWorkModal(props) {
  const {portfolioData} = props
  const searchParams = useSearchParams();
  const router = useRouter();

  document.body.style.overflow = "hidden";

  function closeModal() {
    router.push({ query: { username: router.query.username } });
    document.body.style.overflow = "unset";
  }

  return (
    <div className="fixed z-30 top-[2.5rem] left-0 bg-black bg-opacity-50 h-full w-full flex flex-col justify-center items-center text-sm">
      <button
        onClick={closeModal}
        className="absolute top-5 z-30 right-0 p-5 cursor-pointer text-bgPrimary hover:text-bgAccent"
      >
        <i className="fa-solid fa-xmark text-3xl"></i>
      </button>

    <DeletForm portfolioData={portfolioData} closeModal={closeModal} id={router.query.id}/>
    </div>
  )
}
