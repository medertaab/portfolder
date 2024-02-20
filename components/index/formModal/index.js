import React from "react";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";
import { exitModal } from "../../../utilities/exitModal";

export default function FormModal(props) {
  const { modalRef, mode, setMode } = props;

  return (
    <dialog
      ref={modalRef}
      className="w-[400px] h-[560px] bg-bgPrimary rounded-3xl backdrop:bg-black backdrop:opacity-30"
      onClick={(e) => exitModal(e, modalRef)}
    >
      <div className="h-full flex flex-col">
        <button
          type="button"
          title="Close log in pop-up window"
          onClick={() => modalRef.current.close()}
          className="fa-solid fa-xmark absolute top-0 right-0 text-2xl p-5 cursor-pointer hover:text-bgAccent duration-150 text-textPrimary"
        ></button>
        {mode == "signup" && <SignUpForm setMode={setMode}/>}
        {mode == "login" && <LogInForm setMode={setMode}/>}
      </div>
    </dialog>
  );
}
