import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import AddImage from "./addImage";

export default function EditModal() {
  const searchParams = useSearchParams();
  const possibleActions = ["add", "update"];
  const router = useRouter();
  
  document.body.style.overflow = "hidden";

  function closeModal() {
    router.push({query: {username: router.query.username}})
    document.body.style.overflow = "unset";
  }

  if (!possibleActions.includes(searchParams.get("type"))) return;

  return (
    <div className="fixed z-30 top-[2.5rem] left-0 bg-textPrimary bg-opacity-50 h-full w-full flex flex-col justify-center items-center">
      {/* Exit button */}
      <button
        onClick={closeModal}
        className="absolute top-0 z-30 right-0 p-5 cursor-pointer text-bgPrimary hover:text-bgAccent"
      >
        <i className="fa-solid fa-xmark text-3xl"></i>
      </button>
      
      <AddImage closeModal={closeModal}/>
    </div>
  );
}
