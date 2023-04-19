import Link from "next/link";
import React from "react";
import { useAuth } from "../../../context/AuthContext";

export default function AccountSettings() {
  const { currentUser } = useAuth();

  return (
    <div className="sm:p-10 p-3 py-6 [&_label]:font-semibold">

      <label>Username</label>
      <div className="flex items-center pt-2">
        <div className="h-fit w-fit px-2 flex border-b-2 border-bgAccent items-center">
          <p className="text-gray-500">portfolder.com/</p>
          <p className="font-semibold">{currentUser.displayName}</p>
        </div>
        <Link
          href="/settings/username"
          className="w-fit px-2 underline hover:text-bgAccent duration-150"
        >
          Change username
        </Link>
      </div>

      <div className="divider"></div>

      <label>Email address</label>
      <div className="flex items-center pt-2">
        <div className="h-fit w-fit px-2 flex border-b-2 border-bgAccent items-center">
          <p>{currentUser.email}</p>
        </div>
        <Link
          href="/settings/email"
          className="w-fit px-2 underline hover:text-bgAccent duration-150"
        >
          Change email address
        </Link>
      </div>

      <div className="divider"></div>

      <label>Password</label>
      <div className="w-full flex">
        <Link
          href="/settings/password"
          className="w-fit p-2 underline hover:text-bgAccent duration-150"
        >
          Change password
        </Link>
      </div>

      <div className="divider"></div>

      <Link
        href="/settings/deleteaccount"
        className="w-fit underline hover:text-bgAccent duration-150"
      >
        Delete account
      </Link>
    </div>
  );
}
