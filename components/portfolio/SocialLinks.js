import Link from "next/link";
import React from "react";

export default function SocialLinks(props) {
  const { pageOwner, portfolioData } = props;
  const { socials } = portfolioData
  
  function icon(site, link, active, id) {
    const style = `h-9 w-9 text-xl rounded-full mx-1 hover:bg-bgAccent duration-150 ${!active ? 'border-2 border-textPrimary border-dashed' : 'bg-textPrimary text-bgPrimary'}`
    if (site == "custom") {
      return (
        <Link href={link} title={site} className={style} key={id}>
          <i className="ri-links-line self-center align-middle text-2xl"></i>
        </Link>
      );
    } else {
      return (
        <Link href={link} title={`${site} page`} className={style} key={id}>
          <i className={`ri-${site}-fill align-middle text-2xl`}></i>
        </Link>
      );
    }
  }

  if (!pageOwner && !socials) {
    return
  }

  if (pageOwner && !socials) {
    return (
      <div className="relative m-auto flex w-fit h-fit gap-2 justify-center pt-2 pb-3 opacity-50">
        <Link href="profile" className="absolute top-0 z-10 w-full h-full bg-bgPrimary bg-opacity-80 opacity-0 duration-150 hover:opacity-100 grid place-content-center cursor-pointer text-lg">
          Edit socials
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
      {/* Primary socials first */}
      {Object.keys(socials).map((site, id) => {
        if (socials[site] && !site.startsWith("custom")) {
          return icon(site, `http://${site}.com/${socials[site]}`, true, id)
        }
      })}
      
      {/* Custom links at the end */}
      {Object.keys(socials).map((site, id) => {
        if (socials[site].link && site.startsWith("custom")) {
          return icon('custom', socials[site].link, true, id)
        }
      })}
    </div>
  );
}
