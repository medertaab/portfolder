import React from "react";
import Card from "./Card";
import GalleryIcon from "../../../svg/GalleryIcon";
import ImageLockIcon from "../../../svg/ImageLockIcon"
import EditIcon from "../../../svg/EditIcon";

export default function Cards() {
  const cardsArray = [
    {
      text: "Make a portfolio page, curate an image gallery or create an inspiration board",
      image: <GalleryIcon />,
    },
    {
      text: "We don’t store your files - no AI scraping or copyright concerns from our side",
      image: <ImageLockIcon />,
    },
    {
      text: "Link your socials and resume to be easily accessible to companies and recruiters",
      image: <EditIcon />,
    },
  ];

  return (
    <ul className="mt-16 flex h-48 max-w-[80%] m-auto flex-wrap justify-around gap-10">
      {cardsArray.map((data) => {
        return <li><Card data={data}/></li>;
      })}
    </ul>
  );
}
