import React from "react";
import { useRef, useState } from "react";
import FormModal from "./formModal";

export default function IndexPage() {
  const modal = useRef();
  const [mode, setMode] = useState("signup")

  // Determine which modal to open
  function openModal(mode) {
    setMode(mode)
    modal.current.showModal();
  }

  return (
    <div className="flex flex-col lg:flex-row items-center m-auto gap-16 p-8 lg:p-4 lg:gap-8">
      <div className="flex flex-col gap-6 text-center lg:text-left">
        <h2 className="text-6xl">Assemble a portfolio page - fast and easy</h2>
        <h3 className="text-xl">
          Just <span className="text-bgAccent">link your images</span> and they
          will appear on your page. That’s it!
        </h3>
        <div className="flex gap-2 mt-2 mx-auto lg:mx-0">
          <button
            title="Open sign up pop-up window"
            onClick={() => openModal("signup")}
            className="text-lg p-1 px-8 rounded-full bg-bgAccent text-primaryLight transition ease-in-out hover:-translate-y-1"
          >
            Create Page
          </button>
          <button
            title="Open log in pop-up window"
            onClick={() => openModal("login")}
            className="text-lg p-1 px-8 rounded-full border-[1px] border-textPrimary transition ease-in-out hover:-translate-y-1"
          >
            Log In
          </button>
        </div>
      </div>
      <img className="h-full lg:w-1/2" src="/hero_image.svg"></img>

      <FormModal modalRef={modal} mode={mode} setMode={setMode}/>
    </div>
  );
}
