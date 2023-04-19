import React from "react";
import Link from "next/link";
import Image from "next/image";
import SocialLinks from "./SocialLinks";

export default function Header(props) {
  const { pageOwner, portfolioData } = props;
  const mainData = portfolioData.mainData;

  const gridStyle =
    "p-2 grid relative w-fit m-auto justify-center items-center sm:grid-cols-[200px_minmax(150px,_250px)]";
  const soloStyle =
    "p-2 w-fit m-auto relative flex items-center justify-center";

  return (
    <header className="relative w-full pt-2">
      <div className={`${mainData.icon ? gridStyle : soloStyle}`}>
        {/* Edit button if owner */}
        {pageOwner && (
          <Link
            href={"/manage"}
            className="absolute z-30 top-0 right-[-1rem] opacity-50 hover:opacity-100 duration-150 cursor-pointer"
          >
            <i className="fa-solid fa-user-pen 0"></i>
          </Link>
        )}

        {mainData.icon && (
          <Image
            src={mainData.icon}
            alt=""
            width={200}
            height={200}
            className="m-auto py-3"
            unoptimized={true}
          ></Image>
        )}

        <div className="break-words">
          <p
            className={`opacity-50 text-sm ${
              !mainData.name && "text-3xl opacity-100"
            }`}
          >{`@${portfolioData.username}`}</p>

          {mainData.name && (
            <h1 className="text-3xl text-textPrimary py-1">{mainData.name}</h1>
          )}

          {mainData.title && <h2 className="mb-3">{mainData.title}</h2>}

          {mainData.email && (
            <Link
              href={`mailto:${mainData.email}`}
              className="inline-block text-sm border-2 border-bgAccent w-24 py-1 mx-0.5 rounded hover:bg-bgAccent duration-150"
            >
              <i className="fa-solid fa-envelope"></i> Email
            </Link>
          )}
          {!mainData.email && pageOwner && (
            <Link
              href="/manage"
              className="inline-block text-sm border-2 border-textPrimary border-dashed w-24 py-1 mx-0.5 rounded duration-150 opacity-50 hover:opacity-100"
            >
              Add email
            </Link>
          )}

          {mainData.resume && (
            <a
              href={`${mainData.resume}`}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-block text-sm border-2 border-bgAccent w-24 py-1 mx-0.5 rounded hover:bg-bgAccent duration-150"
            >
              <i className="fa-solid fa-file"></i> Resume
            </a>
          )}
          {!mainData.resume && pageOwner && (
            <Link
              href="/manage"
              className="inline-block text-sm border-2 border-textPrimary border-dashed w-24 py-1 mx-0.5 rounded duration-150 opacity-50 hover:opacity-100"
            >
              Add resume
            </Link>
          )}
        </div>
      </div>

      <SocialLinks pageOwner={pageOwner} portfolioData={portfolioData} />
    </header>
  );
}
