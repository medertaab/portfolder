import React, { useState } from "react";
import Image from "next/image";
import SocialLinks from "./SocialLinks";
import Modal from "./Modal";

export default function Header() {
  const [openModal, setOpenModal] = useState(false);

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
      <div className="grid justify-center items-center sm:grid-cols-[200px_minmax(150px,_250px)]">
        <Image
          src="https://pbs.twimg.com/profile_images/1526986928335331329/Asm6HDlT_400x400.jpg"
          alt=""
          width={200}
          height={200}
          className="m-auto py-3 "
        ></Image>
        
        <div className="">
          <h1 className="text-3xl">MEDER TAAB</h1>
          <h2>Illustration / Concept Art</h2>
          <p>medertaab@gmail.com</p>
        </div>
      </div>

      <SocialLinks />
    </div>
  );
}
