import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SocialLinks from "./SocialLinks";

export default function Header(props) {
  const { pageOwner, portfolioData } = props;
  const mainData = portfolioData.mainData;
  
  const [editHovered, setEditHovered] = useState(false);

  return (
    <header className={`w-full max-w-[40rem] m-auto pt-2 sm:mt-8 ${editHovered && "bg-textPrimary bg-opacity-20"} transition ease-out p-2 rounded-3xl`}>
      <div className="relative flex flex-col-reverse items-center sm:flex-row sm:items-start break-all">

        {pageOwner && (
          <Link
            href={"/manage"}
            target="_blank"
            rel="noreferrer noopener"
            className="absolute -right-14 top-0 sm:flex justify-center items-center text-center size-10 p-2 border-2 opacity-70 border-textPrimary text-textPrimary rounded-full transition hover:opacity-100 hidden"
            onMouseEnter={() => setEditHovered(true)}
            onMouseLeave={() => setEditHovered(false)}
          >
            <i class="fa-solid fa-pen-to-square"></i>
          </Link>
        )}

        {/* Name, title and main links */}
        <div className="relative min-h-[180px] break-words grow flex flex-col justify-center py-4 tracking-tight text-center sm:text-start">
          {mainData.name && (
            <h1 className="text-[2.7rem] leading-none text-textPrimary mr-2">
              {mainData.name}
            </h1>
          )}

          {mainData.title && (
            <h2 className="opacity-75 mt-1 mb-4">{mainData.title}</h2>
          )}

          <div className="w-full flex gap-4 mt-auto text-[0.9rem]">
            {mainData.email && (
              <Link
                href={`mailto:${mainData.email}`}
                className="inline-block text-center w-32 py-2 border-2 border-textPrimary bg-textPrimary text-bgPrimary rounded-full transition hover:-translate-y-1"
              >
                Email
              </Link>
            )}
            {!mainData.email && pageOwner && (
              <Link
                href="/manage"
                className="inline-block text-center w-32 py-2 border-dashed border-2 border-textPrimary rounded-full opacity-50 hover:opacity-100 ease-in-out transition"
              >
                Add email
              </Link>
            )}

            {mainData.resume && (
              <Link
                href={`${mainData.resume}`}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-block text-center w-32 py-2 border-2 border-textPrimary bg-textPrimary text-bgPrimary rounded-full transition hover:-translate-y-1"
              >
                Resume
              </Link>
            )}
            {!mainData.resume && pageOwner && (
              <Link
                href="/manage"
                className="inline-block text-center w-32 py-2 border-dashed border-2 border-textPrimary rounded-full opacity-50 hover:opacity-100 ease-in-out transition"
              >
                Add resume
              </Link>
            )}

            {/* {pageOwner && (
              <Link
                href={"/manage"}
                target="_blank"
                rel="noreferrer noopener"
                className="text-center w-32 py-2 border-2 opacity-70 border-textPrimary text-textPrimary rounded-full transition hover:-translate-y-1 hover:opacity-100 hidden sm:inline-block"
              >
                Edit profile
              </Link>
            )} */}
          </div>
        </div>

        {/* Icon */}
        {mainData.icon && (
          <Image
            src={mainData.icon}
            alt=""
            width={180}
            height={180}
            unoptimized={true}
            className="rounded-[2rem]"
          ></Image>
        )}
      </div>

      <SocialLinks pageOwner={pageOwner} portfolioData={portfolioData} />

      {/* <h3 className="m-auto block w-fit mt-4 opacity-50">@{portfolioData.username}</h3> */}
    </header>
  );
}
