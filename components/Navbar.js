import React, { useState } from "react";
import MenuModal from "./MenuModal";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

export default function Navbar() {
  const [openModal, setOpenModal] = useState(false);
  const { currentUser, theme, toggleTheme } = useAuth();


  return (
    <div className="w-full h-10 sticky top-0 z-10 bg-bgPrimary flex items-center p-2 shadow-sm">
      <Link className="text-3xl grid place-content-center p-2" href='/'>
        <button >🖼️</button>
      </Link>

      <h3 className="w-full text-right px-1">
        {currentUser && `@${currentUser.displayName}`}
      </h3>

      {/* Dark mode button */}
      <button onClick={toggleTheme} className="relative bg-textPrimary w-14 rounded-full h-full">
        <div className={`bg-bgPrimary z-10 h-full p-0.5 bg-clip-content aspect-square rounded-full absolute top-0 ${theme === 'light' ? 'left' : 'right'}-0 duration-150`}></div>
        <span className="absolute top-0 left-0 w-full px-[5px] flex justify-between text-bgPrimary text-lg">
          <i className="ri-moon-clear-fill"></i>
          <i className="ri-sun-fill"></i>
        </span>
      </button>

      {/* Modal menu button for logged in users */}
      {currentUser && (
        <button className="w-fit px-2" onClick={() => setOpenModal(true)}>
          <i className="fa-solid fa-bars text-2xl"></i>
        </button>
      )}
      {openModal && <MenuModal setOpenModal={setOpenModal} />}


    </div>
  );
}
