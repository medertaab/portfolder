import React, { useState } from "react";
import MenuModal from "./MenuModal";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useRouter } from "next/router";

export default function Navbar(props) {
  const { logo, pageOwner, setAddingImage } = props;
  const [openModal, setOpenModal] = useState(false);
  const { currentUser } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const router = useRouter();
  // const isMainPage = router.pathname == "/";

  function handleAddWorkButton() {
    router.push({
      query: { username: router.query.username, action: "edit", type: "add" },
    });
  }

  return (
    <nav className="w-full mx-auto h-12 sm:h-fit sticky top-0 z-40 bg-bgPrimary border-bgSecondary border-b-[1px] flex justify-center items-center px-2 sm:py-2">
      <div className="w-full max-w-screen-2xl m-auto flex items-center">
        <Link
          className="sm:text-xl text-xl p-2 flex select-none"
          href={currentUser?.displayName ? `/${currentUser.displayName}` : "/"}
        >
          <img src="/icon.png" className="h-6 sm:h-8"></img>
          {logo && <p className="ml-3">portfolder</p>}
        </Link>
        <div className="flex ml-auto items-center gap-2">
          {pageOwner && (
            <div className="">
              <button
                onClick={handleAddWorkButton}
                type="button"
                className="hidden sm:block text-center h-8 text-[0.9rem] text-primaryLight bg-bgAccent rounded-full w-32 hover:bg-opacity-80 duration-150"
              >
                Add work +
              </button>
            </div>
          )}
          {/* {!currentUser && !pageOwner && !isMainPage && (
            <Link
              href="/"
              className="text-center flex justify-center items-center h-8 text-[0.9rem] text-primaryLight bg-bgAccent rounded-full w-36 hover:bg-opacity-80 duration-150"
            >
              Start your page
            </Link>
          )} */}
          {/* Dark mode button */}
          <button
            onClick={toggleTheme}
            title="Theme toggle"
            className="relative bg-textPrimary w-12 sm:w-14 max-w-[56px] rounded-full h-6 sm:h-8 border-2 border-textPrimary"
          >
            <div
              className={`bg-bgPrimary z-10 h-full aspect-square rounded-full absolute top-0 ${
                theme === "light" ? "left" : "right"
              }-0 duration-150`}
            ></div>
            <span className="absolute inset-0 max-w-[3.1rem] m-auto px-0.5 flex justify-between items-center text-lg">
              <i
                className={`ri-moon-clear-fill ml-[-2px] ${
                  theme === "light" ? "text-textPrimary" : "text-bgPrimary"
                }`}
              ></i>
              <i
                className={`ri-sun-fill ${
                  theme === "dark" ? "text-textPrimary" : "text-bgPrimary"
                }`}
              ></i>
            </span>
          </button>
          {/* Modal menu button for logged in users */}
          {currentUser?.displayName && (
            <button
              className="w-fit flex items-center"
              onClick={() => setOpenModal(true)}
              title="Open menu"
            >
              <i className="fa-solid fa-bars text-[1.75rem] text-textPrimary ml-1"></i>
            </button>
          )}
        </div>
        {openModal && (
          <MenuModal
            setOpenModal={setOpenModal}
            pageOwner={pageOwner}
            setAddingImage={setAddingImage}
          />
        )}
      </div>
    </nav>
  );
}
