import React from "react";
import { useRef, useState } from "react";
import FormModal from "./formModal";
import Cards from "./cards";
import Hero from "./hero";
import Example from "./example";
import HowTo from "./howto";
import Action from "./action";

export default function IndexPage() {
  const modal = useRef();
  const [mode, setMode] = useState("signup");

  // Determine which modal to open
  function openModal(mode) {
    setMode(mode);
    modal.current.showModal();
  }

  return (
    <div className="m-auto gap-16 p-8 lg:p-4 lg:gap-8 ">
      <Hero openModal={openModal}/>
      <Cards />
      <Example />

      <HowTo />
      <Action openModal={openModal}/>
      <FormModal modalRef={modal} mode={mode} setMode={setMode} />
    </div>
  );
}
