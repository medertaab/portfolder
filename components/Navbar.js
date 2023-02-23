import React, { useState } from "react";
import MenuModal from "./MenuModal";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const [openModal, setOpenModal] = useState(false);
  const { currentUser } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-full h-10 sticky top-0 z-40 bg-bgPrimary flex items-center p-2 border-b-[1px] border-bg">
      <Link
        className="sm:text-3xl text-xl grid place-content-center p-2 text-textPrimary"
        href={currentUser ? `/${currentUser.displayName}` : "/"}
      >
        🖼️
      </Link>

      {/* Dark mode button */}
      <button
        onClick={toggleTheme}
        className="relative bg-textPrimary w-16 max-w-[48px] rounded-full h-full border-2 border-textPrimary ml-auto"
      >
        <div
          className={`bg-bgPrimary z-10 h-full aspect-square rounded-full absolute top-0 ${
            theme === "light" ? "left" : "right"
          }-0 duration-150`}
        ></div>
        <span className="absolute inset-0 max-w-[2.7rem] m-auto px-0.5 flex justify-between items-center text-lg">
          <i className={`ri-moon-clear-fill ml-[-2px] ${theme === 'light' ? "text-textPrimary" : "text-bgPrimary"}`}></i>
          <i className={`ri-sun-fill ${theme === 'dark' ? "text-textPrimary" : "text-bgPrimary"}`}></i>
        </span>
      </button>

      {/* Modal menu button for logged in users */}
      {currentUser?.displayName && (
        <button
          className="w-fit px-2 flex items-center"
          onClick={() => setOpenModal(true)}
        >
          <i className="fa-solid fa-bars text-2xl"></i>
        </button>
      )}
      {openModal && <MenuModal setOpenModal={setOpenModal} />}
    </div>
  );
}
