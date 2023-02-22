import React from "react";
import Link from "next/link";
import Navbar from "../Navbar";
import { useAuth } from "../../context/AuthContext";

export default function SettingsLayout({ children }) {
  const { currentUser } = useAuth()
  return (
    <>
      <Navbar />
      <div className="max-w-5xl min-h-[calc(100vh-2.5rem)] m-auto">
        <ul className="sm:flex sm:fixed h-full w-[250px] bg-bgPrimary hidden p-7 flex-col gap-2 text-lg [&>*]:p-1 basis-[250px] max-h-[calc(100vh-2.5rem)] border-r-2 border-bgSecondary">
          <li className="hover:text-bgAccent duration-150">
            <Link href={`/${currentUser.displayName}`}>
              <i className="fa-solid fa-house"></i> Your page
            </Link>
          </li>
          <li className="hover:text-bgAccent duration-150">
            <Link href="/manage">
              <i className="fa-solid fa-palette"></i> Manage page
            </Link>
          </li>
          <li className="hover:text-bgAccent duration-150">
            <Link href="/settings">
              <i className="fa-solid fa-gear"></i> Settings
            </Link>
          </li>
          <li className="hover:text-bgAccent duration-150 mt-auto">
            <button onClick={() => logout()}>
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </li>
        </ul>
        <div className="sm:ml-[250px] sm:p-0 p-4 min-h-full">
          {children}
        </div>
      </div>
    </>
  );
}
