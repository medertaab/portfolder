import React, { useState } from "react";
import Link from "next/link";

export default function Description(props) {
  const { pageOwner, portfolioData } = props;
  const [editHovered, setEditHovered] = useState(false);

  if (!portfolioData.description || portfolioData.description === {}) {
    return;
  } else if (
    !portfolioData.description.text &&
    !portfolioData.description.image &&
    !pageOwner
  ) {
    return;
  } else if (!portfolioData.description.text && pageOwner) {
    return (
      <div className="w-full max-w-[40rem] m-auto flex justify-center mt-4 opacity-50 hover:opacity-80 ease-in-out transition mb-8">
        <Link href="/manage?type=description">Add description +</Link>
      </div>
    );
  } else {
    return (
      <article className={`relative max-w-[50rem] min-h-52 mt-10 m-4 p-10 z-20 sm:m-auto sm:mt-12 border-[1px] border-textPrimary rounded-2xl grid sm:grid-flow-col sm:grid-cols-[2fr,_3fr] gap-8 ${editHovered && "bg-textPrimary bg-opacity-30"} transition ease-in-out`}>
        {pageOwner && (
          <Link
            href={"/manage?type=description"}
            target="_blank"
            rel="noreferrer noopener"
            className="absolute right-1 top-1 sm:flex justify-center items-center text-center size-10 p-2  opacity-70 border-textPrimary text-textPrimary rounded-full transition hover:opacity-100 hover:text-bgPrimary hidden"
            onMouseEnter={() => setEditHovered(true)}
            onMouseLeave={() => setEditHovered(false)}
          >
            <i class="fa-solid fa-pen-to-square"></i>
          </Link>
        )}

        {/* {pageOwner && (
          <Link
            className="text-xl absolute top-0 right-0 p-2 opacity-50 duration-150 cursor-pointer hover:opacity-100 hover:rotate-45"
            href="/manage"
          >
            <i className="fa-solid fa-gear"></i>
          </Link>
        )} */}

        {portfolioData.description.image && (
          <img
            src={portfolioData.description.image}
            alt=""
            className="sm:max-w-full max-w-[75%] sm:m-0 m-auto"
          ></img>
        )}

        {portfolioData.description.text && (
          <div
            className={`text-left pl-5 [&_h3]:text-2xl [&_a]:underline [&_a:hover]:text-bgAccent [&_a:hover]:duration-150 ${
              !portfolioData.description.image && "col-span-2"
            }`}
            dangerouslySetInnerHTML={{ __html: portfolioData.description.text }}
          />
        )}

        {/* <img src="./gradient_eclipse1.svg" className="scale-75 absolute -right-[18%] -top-[10%] z-10"></img> */}
      </article>
    );
  }
}
