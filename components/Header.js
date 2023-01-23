import React, { useState } from "react";
import Image from "next/image";
import SocialLinks from "./SocialLinks";
import Link from "next/link";

export default function Header(props) {
  const { pageOwner, portfolioData } = props;
  const { mainData } = portfolioData

  const gridStyle = "grid relative w-fit m-auto justify-center items-center sm:grid-cols-[200px_minmax(150px,_250px)]"
  const soloStyle = ""

  return (
    <div className="relative w-full">
      <div className={`${mainData.icon ? gridStyle : soloStyle}`}>
        
        {/* Edit button if owner */}
        {pageOwner && (
          <Link
            href={"/settings"}
            className="absolute top-0 right-0 p-2 opacity-50 hover:opacity-100 duration-150 cursor-pointer"
          >
            <i className="fa-solid fa-user-pen 0"></i>
          </Link>
        )}

        {
          mainData.icon && 
          <Image
            src={mainData.icon}
            alt=""
            width={200}
            height={200}
            className="m-auto py-3"
          ></Image>
        }

        <div className="">
          <p className="opacity-50 text-sm">{`@${portfolioData.username}`}</p>
          <h1 className="text-3xl text-textPrimary">{mainData.name}</h1>
          {mainData.title && <h2>{mainData.title}</h2>}
          {mainData.email && (
            <button className="text-sm border-2 border-bgAccent w-24 px-2 py-1 rounded m-1 hover:bg-bgAccent duration-150">
              <Link href={`mailto:${mainData.email}`}>
                <i className="fa-solid fa-envelope"></i> Email
              </Link>
            </button>
          )}
          {!mainData.email && pageOwner && (
            <button className="text-sm border-2 border-textPrimary border-dashed w-24 px-1 py-1 rounded m-1 duration-150 opacity-50 hover:opacity-100 hover:before:content-['Add_']">
              <Link href="/manage">
                Email
              </Link>
            </button>
          )}

          {mainData.resume && (
            <button className="text-sm border-2 border-bgAccent w-24 px-2 py-1 rounded m-1 hover:bg-bgAccent duration-150">
              <Link href={mainData.resume}>
                <i class="fa-solid fa-file"></i> Resume
              </Link>
            </button>
          )}
          {!mainData.resume && pageOwner && (
            <button className="text-sm border-2 border-textPrimary border-dashed w-24 px-1 py-1 rounded m-1 duration-150 opacity-50 hover:opacity-100 hover:before:content-['Add_']">
              <Link href={'/manage'}>
                Resume
              </Link>
            </button>
          )}
        </div>
      </div>

      <SocialLinks pageOwner={pageOwner} portfolioData={portfolioData}/>
    </div>
  );
}
