import React from "react";
import Image from "next/image";

export default function Information() {
  return (
    <div className="py-5">
      <div className="m-auto max-w-xl grid sm:grid-flow-col sm:grid-cols-[auto_1fr] bg-slate-500 px-5 ">
        <Image src="https://pbs.twimg.com/media/Fg-uPBiXEAY5wRz?format=jpg&name=medium"
          alt=""
          width={200}
          height={200}
          className="m-auto py-5"
        ></Image>
        <div className="text-left px-5 py-5">
          This is where I can write info about myself
          <br />
          And add some <a href="link">links</a>
        </div>
      </div>
    </div>
  );
}
