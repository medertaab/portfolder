import React from "react";
import Card from "./Card";
import GalleryIcon from "../../../svg/GalleryIcon";
import ImageLockIcon from "../../../svg/ImageLockIcon";
import EditIcon from "../../../svg/EditIcon";

export default function Cards() {
  const cardsArray = [
    {
      title: "Flexible",
      text: "Make a portfolio page, curate an image gallery or create an inspiration board",
      image: <GalleryIcon />,
    },
    {
      title: "Secure",
      text: "We don’t store your files - no AI scraping or copyright concerns from our side",
      image: <ImageLockIcon />,
    },
    {
      title: "Convenient",
      text: "Link your socials and resume to be easily accessible to companies and recruiters",
      image: <EditIcon />,
    },
  ];

  return (
    <>
      <div className="text-center mt-6">
        <h3 className="text-3xl font-semibold fade-in">
          Your Portfolio, Simplified.
        </h3>
        <p className="text-lg mt-1">
          Launch a beautiful portfolio without complicated setups or
          re-uploading files
        </p>
      </div>
      <ul
        className="mt-8 flex min-h-48 max-w-[80%] m-auto flex-wrap justify-around gap-10 fade-in"
        style={{ opacity: 0, animationDelay: "750ms" }}
      >
        {cardsArray.map((data, id) => {
          return (
            <li key={id}>
              <Card data={data} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
