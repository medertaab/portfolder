import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function InfoBlock(props) {
  const { pageOwner, portfolioData } = props;

  if (!portfolioData.infoBlock) {
    return;
  } else {
    return (
      <div className="py-5 w-full">
        <div className="relative m-auto max-w-xl border-2 border-bgAccent rounded grid sm:grid-flow-col sm:grid-cols-[auto_1fr] px-5 ">
          {pageOwner && (
            <Link className="text-xl absolute top-0 right-0 p-2 opacity-50 duration-150 cursor-pointer hover:opacity-100 hover:rotate-45" href="/manage">
              <i className="fa-solid fa-gear"></i>
            </Link>
          )}
          {portfolioData.infoBlock.image && (
            <Image
              src={portfolioData.infoBlock.image}
              alt=""
              width={200}
              height={200}
              className="m-auto py-5"
            ></Image>
          )}
          {portfolioData.infoBlock.text && (
            <p className="text-left px-5 py-5">
              {portfolioData.infoBlock.text}
            </p>
          )}
        </div>
      </div>
    );
  }
}
