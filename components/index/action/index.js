import Image from "next/image";
import React from "react";

export default function Action({openModal}) {
  return (
    <div className="relative z-0 flex mt-32 px-16 py-8 bg-purple w-full max-w-5xl m-auto rounded-3xl text-white gap-16 items-center md:flex-row flex-col">
      <Image
        src="/icon.png"
        alt="Logo of website, starry night in a golden frame"
        height={250}
        width={250}
      />
      <div>
        <h3 className="text-3xl font-semibold ">
          Ready to Show the World Your Work?
        </h3>
        <p className="text-lg mt-1">
          Create your portfolio now and let your art take the spotlight.
        </p>
        <button
          title="Open sign up pop-up window"
          onClick={() => openModal("signup")}
          className="text-lg p-1 px-8 mt-4 rounded-full transition ease-in-out hover:-translate-y-1 bg-bgPrimary text-textPrimary"
        >
          Create Page
        </button>
        <div
          className="absolute md:top-[45%] top-[75%] md:-right-[10%] -right-[20%] size-[17rem] bg-gradient-to-br from-golden from-[25%] blur-[26px] to-transparent rounded-full -z-10 animate-spin"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </div>
  );
}
