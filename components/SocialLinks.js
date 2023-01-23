import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function SocialLinks(props) {
  const { pageOwner, portfolioData } = props;
  const { socials } = portfolioData
  
  function icon(site, link, active) {
    if (site == "custom") {
      return (
        <button className={`h-7 w-7 rounded-full mx-1 ${!active ? 'border-2 border-textPrimary border-dashed' : 'bg-textPrimary text-bgPrimary'}`} dataHo>
          <Link href={link} title={site}>
            <i className="ri-links-line text-lg"></i>
          </Link>
        </button>
      );
    } else {
      return (
        <button className={`h-7 w-7 rounded-full mx-1 ${!active ? 'border-2 border-textPrimary border-dashed' : 'bg-textPrimary text-bgPrimary'}`}>
          <Link href={link} title={`${site} page`}>
            <i className={`ri-${site}-fill text-lg ${['instagram', 'facebook', 'youtube', 'linkedin'].includes(site) && 'pr-0.5'}`}></i>
          </Link>
        </button>
      );
    }
  }

  if (!pageOwner && !socials) {
    return
  }

  if (pageOwner && !socials) {
    return (
      <div className="relative m-auto flex w-fit h-fit gap-2 justify-center pt-2 pb-3 opacity-50">
        <Link href="profile">
          <button className="absolute top-0 z-10 w-full h-full bg-bgPrimary bg-opacity-80 opacity-0 duration-150 hover:opacity-100 grid place-content-center cursor-pointer text-lg">
            Edit socials
          </button>
        </Link>
        {icon("twitter", "", false)}
        {icon("instagram", "", false)}
        {icon("facebook", "", false)}
        {icon("youtube", "", false)}
        {icon("linkedin", "", false)}
        {icon("custom", "", false)}
      </div>
    )
  }

  return (
    <div className="relative m-auto flex w-fit h-fit gap-2 justify-center pt-2 pb-3">
      {Object.keys(socials).map(site => {
        if (site.startsWith("custom")) {
          return icon('custom', socials[site].link, true)
        }
        return icon(site, `http://${site}.com/${socials[site]}`, true)
      })}
    </div>
  );
}
