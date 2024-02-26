import Link from "next/link";
import React from "react";

export default function SocialLinks(props) {
  const { pageOwner, portfolioData } = props;
  const { socials } = portfolioData;

  if (!pageOwner && Object.keys(socials).length === 0) {
    return;
  }

  if (pageOwner && Object.keys(socials).length === 0) {
    return (<div className="w-full max-w-[40rem] m-auto flex justify-center mt-4 opacity-50 hover:opacity-80 ease-in-out transition">
      <Link href="/manage?type=socials">Add socials +</Link>
    </div>)
  }

  return (
    <div className="relative border-[1px] border-textPrimary rounded-2xl max-w-[40rem] m-auto flex flex-wrap gap-5 justify-center p-3 px-12 pretty mx-2 mt-0 sm:mx-auto sm:mt-4">
      {/* Primary socials first */}
      {Object.keys(socials)
        .sort()
        .map((site, id) => {
          if (socials[site] && !site.startsWith("custom")) {
            return (
              <Link
                href={`http://${site}.com/${socials[site]}`}
                title={`${site} page`}
                key={id}
                className="text-textPrimary text-[0.9rem] capitalize underline transition ease-in-out hover:text-bgAccent"
              >
                {site}
              </Link>
            );
          }
        })}

      {/* Custom links at the end */}
      {Object.keys(socials).map((site, id) => {
        if (socials[site] && site.startsWith("custom")) {
          return (
            <Link
              href={site}
              title={`${site} page`}
              key={id}
              className="text-textPrimary text-[0.9rem] capitalize underline transition ease-in-out hover:text-bgAccent"
            >
              {site}
            </Link>
          );
        }
      })}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="fill-textPrimary h-8 absolute right-2 transform top-1/2 -translate-y-1/2"
        viewBox="0 0 16 16"
      >
        <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.854 10.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707z" />
      </svg>
    </div>
  );
}
