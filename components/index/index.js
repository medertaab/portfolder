import React from "react";
import { useRef, useState } from "react";
import FormModal from "./formModal";
import Cards from "./cards";
import Underline from "../../svg/Underline"
import HeroImage from "../../svg/HeroImage";
import Drawings from "../../svg/Drawings";

export default function IndexPage() {
  const modal = useRef();
  const [mode, setMode] = useState("signup");

  // Determine which modal to open
  function openModal(mode) {
    setMode(mode);
    modal.current.showModal();
  }

  return (
    <div className="m-auto gap-16 p-8 lg:p-4 lg:gap-8 h-full">
      <div className="flex flex-col lg:flex-row items-center min-h-[80vh] h-full">
        <div className="relative flex flex-col gap-6 text-center lg:text-left lg:max-w-[50%] z-0 h-full">
          <h2 className="text-6xl">
            Assemble a portfolio page - fast and easy
          </h2>
          <h3 className="text-xl relative">
            Just <span className="text-bgAccent">link your images</span> and
            they will appear on your page. That’s it!
            <Underline />
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
          <div className="absolute -top-[50%] -left-[5rem] size-[17rem] bg-gradient-to-br from-golden from-[25%] blur-[26px] to-transparent rounded-full -z-10 "></div>
        </div>

        <div className="relative h-full lg:w-1/2 z-0 mt-10 lg:mt-0 [&>*:first-child]:scale-[87%]">
          <HeroImage />
          <Drawings />
          <div className="absolute -bottom-11 -right-10 size-[17rem] bg-gradient-to-br from-bgAccent from-[20%] blur-[26px] to-transparent rounded-full -z-10 rotate-180 "></div>
        </div>
      </div>

      <Cards />

      <FormModal modalRef={modal} mode={mode} setMode={setMode} />
    </div>
  );
}
