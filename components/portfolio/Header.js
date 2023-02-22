import React, { useState } from "react";
import Image from "next/image";
import SocialLinks from "./SocialLinks";
import Link from "next/link";
import sanitizeUrl from "../../hooks/useSanitizeUrl"

export default function Header(props) {
  const { pageOwner, portfolioData } = props;
  const mainData = portfolioData.mainData
  const [hovering, setHovering] = useState(false)

  const gridStyle = "grid relative w-fit m-auto justify-center items-center sm:grid-cols-[200px_minmax(150px,_250px)]"
  const soloStyle = "w-fit m-auto relative"

  return (
    <div className="relative w-full">
      <div className={`${mainData.icon ? gridStyle : soloStyle}`}>
        
        {/* Edit button if owner */}
        {pageOwner && (
          <Link
            href={"/manage"}
            className="absolute z-30 top-0 right-0 opacity-50 hover:opacity-100 duration-150 cursor-pointer p-2"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <i className="fa-solid fa-user-pen 0"></i>
          </Link>
        )}

        <div className={`absolute h-full w-full z-20 bg-textPrimary ${hovering ? "opacity-10" : "hidden"} duration-150 rounded`}></div>

        {
          mainData.icon && 
          <Image
            src={mainData.icon}
            alt=""
            width={200}
            height={200}
            className="m-auto py-3"
            unoptimized={true}
          ></Image>
        }

        <div className="break-words">
          <p className={`opacity-50 text-sm ${!mainData.name && "text-3xl opacity-100"}`}>{`@${portfolioData.username}`}</p>

          {mainData.name && <h1 className="text-3xl text-textPrimary py-1">{mainData.name}</h1>}

          {mainData.title && <h2>{mainData.title}</h2>}

          {mainData.email && (
            <button className="text-sm border-2 border-bgAccent w-24 px-2 py-1 rounded m-1 mt-2 hover:bg-bgAccent duration-150">
              <Link href={`mailto:${mainData.email}`} >
                <i className="fa-solid fa-envelope"></i> Email
              </Link>
            </button>
          )}
          {!mainData.email && pageOwner && (
            <button className="text-sm border-2 border-textPrimary border-dashed w-24 px-1 py-1 rounded m-1 duration-150 opacity-50 hover:opacity-100">
              <Link href="/manage" p>
                Add email
              </Link>
            </button>
          )}

          {mainData.resume && (
            <button className="text-sm border-2 border-bgAccent w-24 px-2 py-1 rounded m-1 hover:bg-bgAccent duration-150" type="button">
              <a href={`${mainData.resume}`} target="_blank" rel="noreferrer noopener">
                <i className="fa-solid fa-file"></i> Resume
              </a>
            </button>
          )}
          {!mainData.resume && pageOwner && (
            <button className="text-sm border-2 border-textPrimary border-dashed w-24 px-1 py-1 rounded m-1 duration-150 opacity-50 hover:opacity-100">
              <Link href="/manage">
                Add resume
              </Link>
            </button>
          )}
        </div>
      </div>

      <SocialLinks pageOwner={pageOwner} portfolioData={portfolioData}/>
    </div>
  );
}
