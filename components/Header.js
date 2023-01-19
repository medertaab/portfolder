import React, { useState } from "react";
import Image from "next/image";
import SocialLinks from "./SocialLinks";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext";
import useFetchMainData from "../hooks/fetchMainData";
import Link from "next/link";

export default function Header() {
  const [openModal, setOpenModal] = useState(false);

  const { currentUser } = useAuth();

  const { loading, error, mainData } = useFetchMainData();

  if (loading || !mainData) {
    return <div>LOADING</div>
  }

  return (
    <div className="relative w-full">
      {/* Modal menu button */}
      {openModal && <Modal setOpenModal={setOpenModal} />}
      <h3 className="text-2xl" onClick={() => setOpenModal(true)}>
        <i className="fa-solid fa-bars absolute left-0 text-white py-2 px-2"></i>
      </h3>

      {/* Dark mode button */}
      <button className="absolute text-2xl top-0 right-0 text-white py-2 px-4">
        <i className="fa-solid fa-moon"></i>
      </button>

      {/* Header grid */}
      <div className="grid relative w-fit m-auto justify-center items-center sm:grid-cols-[200px_minmax(150px,_250px)] border-2 border-solid border-blue-600">
        <Link href={"/settings"} className="absolute top-0 right-0 p-2 opacity-50 hover:opacity-100 duration-150 cursor-pointer">
          <i className="fa-solid fa-user-pen 0"></i>
        </Link>

        <Image
          src="https://pbs.twimg.com/profile_images/1526986928335331329/Asm6HDlT_400x400.jpg"
          alt=""
          width={200}
          height={200}
          className="m-auto py-3 border-2 border-solid border-blue-600"
        ></Image>

        <div className="border-2 border-solid border-blue-600">
          {!mainData.name && <h1 className="text-3xl">{currentUser.displayName}</h1>}
          {mainData.name && <h1 className="text-3xl">{mainData.name}</h1>}
          {mainData.title && <h2>{mainData.title}</h2>}
          {mainData.email && (
            <a href={`mailto:${mainData.email}`}>
              <i className="fa-solid fa-envelope"></i>Contact email
            </a>
          )}
        </div>
      </div>

      <SocialLinks />
    </div>
  );
}
