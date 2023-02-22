import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Description(props) {
  const { pageOwner, portfolioData } = props;

  if (!portfolioData.description || portfolioData.description === {}) {
    return;
  } else {
    return (
      <div className="my-2 p-5 relative m-auto max-w-xl border-2 border-bgAccent rounded grid sm:grid-flow-col sm:grid-cols-[2fr,_3fr]">
        {pageOwner && (
          <Link
            className="text-xl absolute top-0 right-0 p-2 opacity-50 duration-150 cursor-pointer hover:opacity-100 hover:rotate-45"
            href="/manage"
          >
            <i className="fa-solid fa-gear"></i>
          </Link>
        )}
        {portfolioData.description.image && (
          <img
            src={portfolioData.description.image}
            alt=""
            className="sm:max-w-full max-w-[75%] sm:m-0 m-auto"
          ></img>
        )}
        {portfolioData.description.text && (
          <div
            className="text-left pl-5"
            dangerouslySetInnerHTML={{ __html: portfolioData.description.text }}
          />
        )}
      </div>
    );
  }
}
