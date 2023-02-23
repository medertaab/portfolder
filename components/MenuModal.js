import Link from "next/link";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function MenuModal(props) {
  const { currentUser, logout } = useAuth();
  const { setOpenModal } = props;
  const router = useRouter();

  function logoutHandler() {
    logout();
    setOpenModal(false);
    setTimeout(() => {
      router.reload(window.location.pathname);
    }, 500);
  }

  if (!currentUser) {
    router.push("/")
  }

  return (
    <div className="shadowy flex flex-col py-36 fixed h-full w-full max-w-[20rem] right-0 top-0 bg-bgPrimary border-l-bgSecondary border-l-2 [&_*]:w-fit">
      <i
        onClick={() => setOpenModal(false)}
        className="fa-solid fa-xmark absolute top-0 right-0 text-2xl p-5 cursor-pointer hover:text-bgAccent duration-150 "
      ></i>

      <button
        className="m-auto mb-8 border-b-2 border-bgAccent px-5 hover:text-bgAccent duration-150"
        type="button"
      >
        <Link href={`/${currentUser.displayName}`}>
          @{currentUser.displayName}
        </Link>
      </button>

      <div className="flex flex-col gap-3 text-lg m-auto h-full pr-16">
        <Link
          href={`/${currentUser.displayName}`}
          className="hover:text-bgAccent duration-150"
        >
          <div className="min-w-[2rem] inline-block">
            <i className="fa-solid fa-house"></i>
          </div>
          Your page
        </Link>

        <Link
          href={`${currentUser.displayName}/public`}
          className="hover:text-bgAccent duration-150"
        >
          <div className="min-w-[2rem] inline-block">
            <i className="fa-solid fa-eye"></i>
          </div>
          Public preview
        </Link>

        <Link href="/manage" className="hover:text-bgAccent duration-150">
          <div className="min-w-[2rem] inline-block">
            <i className="fa-solid fa-palette"></i>
          </div>
          Manage page
        </Link>

        <Link href="/settings" className="hover:text-bgAccent duration-150">
          <div className="min-w-[2rem] inline-block">
            <i className="fa-solid fa-gear"></i>
          </div>
          Settings
        </Link>

        <button
          onClick={logoutHandler}
          className="mt-auto hover:text-bgAccent duration-150"
        >
          <div className="min-w-[2rem] inline-block">
            <i className="fa-solid fa-right-from-bracket"></i>
          </div>
          Logout
        </button>
      </div>
    </div>
  );
}
