import React, { useState } from "react";
import MenuModal from "./MenuModal";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { useTheme } from "../context/ThemeContext";

export default function Navbar(props) {
  const [openModal, setOpenModal] = useState(false);
  const { currentUser } = useAuth();
  const { theme, toggleTheme } = useTheme();

  if (props.small) {
    return (
      <div className="w-full h-10 sticky top-0 z-30 bg-bgPrimary flex items-center p-2 shadow-sm">
        <Link
          className="text-3xl grid place-content-center p-2 text-textPrimary"
          href="/"
        >
          <button>🖼️</button>
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
          <span className="absolute inset-0 max-w-[2.7rem] m-auto px-0.5 flex justify-between items-center text-bgPrimary text-lg">
            <i className="ri-moon-clear-fill ml-[-1px]"></i>
            <i className="ri-sun-fill"></i>
          </span>
        </button>
      </div>
    );
  } else
    return (
      <div className="w-full h-10 sticky top-0 z-30 bg-bgPrimary flex items-center p-2 shadow-sm">
        <Link
          className="text-3xl grid place-content-center p-2 text-textPrimary"
          href="/"
        >
          <button>🖼️</button>
        </Link>

        {/* <h3 className="w-full text-right px-1 text-sm">
          {currentUser && (
            <Link href={`/${currentUser.displayName}`}>
              {`@${currentUser.displayName}`}
            </Link>
          )}
        </h3> */}

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
          <span className="absolute inset-0 max-w-[2.7rem] m-auto px-0.5 flex justify-between items-center text-bgPrimary text-lg">
            <i className="ri-moon-clear-fill ml-[-1px]"></i>
            <i className="ri-sun-fill"></i>
          </span>
        </button>

        {/* Modal menu button for logged in users */}
        {currentUser && (
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
