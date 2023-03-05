import React from "react";
import { useAuth } from "../../../context/AuthContext";

export default function AccountSettings(props) {
  const { setPage } = props;
  const { currentUser } = useAuth();

  function handleLink(e) {
    setPage(e.target.id);
  }

  return (
    <div className="sm:p-10 p-3 py-6 [&_label]:font-semibold">
      <label>Username</label>
      <div className="flex items-center pt-2">
        <div className="h-fit w-fit px-2 flex border-b-2 border-bgAccent items-center">
          <p className="text-gray-500">portfolder.com/</p>
          <p className="font-semibold">{currentUser.displayName}</p>
        </div>
        <button             
          id="username"
          button="button"
          onClick={handleLink}
          className="w-fit px-2 underline hover:text-bgAccent duration-150"
        >
          Change username
        </button>
      </div>

      <div className="divider"></div>

      <label>Email address</label>
      <div className="flex items-center pt-2">
        <div className="h-fit w-fit px-2 flex border-b-2 border-bgAccent items-center">
          <p>{currentUser.email}</p>
        </div>
        <button 
          id="email"
          button="button"
          onClick={handleLink}
          className="w-fit px-2 underline hover:text-bgAccent duration-150">
          Change email address
        </button>
      </div>

      <div className="divider"></div>

      <label>Password</label>
      <div className="w-full flex">
        <button
          id="password"
          button="button"
          onClick={handleLink}
          className="w-fit p-2 underline hover:text-bgAccent duration-150"
        >
          Change password
        </button>
      </div>

      <div className="divider"></div>

      <button 
        id="deleteAccount"
        button="button"
        onClick={handleLink}className="w-fit underline hover:text-bgAccent duration-150"
      >
        Delete account
      </button>
    </div>
  );
}
