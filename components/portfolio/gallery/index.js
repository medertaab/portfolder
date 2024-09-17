import React, { useEffect, useState, useRef } from "react";
import Thumbnail from "./thumbnail";
import ImageModal from "./imageModal";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import AddWorkModal from "./addWorkModal";
import UpdateWorkModal from "./updateWorkModal";
import DeleteWorkModal from "./deleteWorkModal";

export default function Gallery(props) {
  const { pageOwner, portfolioData } = props;
  const [imageQuery, setImageQuery] = useState({});
  const modalRef = useRef();
  const images = portfolioData.images;

  const searchParams = useSearchParams();
  const editing = searchParams.get("action") === "edit";
  const adding = searchParams.get("type") === "add";
  const updating = searchParams.get("type") === "update"
  const deleting = searchParams.get("type") === "delete"

  function gridLayout() {
    if (portfolioData.settings.grid === "dynamic") {
      return "fade-in mt-12 p-2 grid sm:grid-cols-[repeat(auto-fill,_minmax(350px,1fr))] grid-cols-1 gap-2 justify-between auto-rows-min grid-flow-dense";
    } else if (portfolioData.settings.grid === "static") {
      return "fade-in mt-12 p-2 grid sm:grid-cols-[repeat(auto-fill,_minmax(350px,1fr))] grid-cols-1 gap-2 justify-between";
    }
  }

  const thumbnailList = Object.keys(images).map((id) => {
    return (
      <Thumbnail
        key={id}
        id={id}
        pageOwner={pageOwner}
        portfolioData={portfolioData}
        modalRef={modalRef}
      />
    );
  });

  // If there are no images
  if (!portfolioData.images) {
    return;
  }

  // If there are images
  return (
    <>
      <ul className={gridLayout()}>{thumbnailList}</ul>
      {!editing && (
        <ImageModal
        imageQuery={imageQuery}
        setImageQuery={setImageQuery}
        portfolioData={portfolioData}
        modalRef={modalRef}
        pageOwner={pageOwner}
      />
      )}
      {adding && <AddWorkModal portfolioData={portfolioData}/>}
      {updating && <UpdateWorkModal portfolioData={portfolioData}/>}
      {deleting && <DeleteWorkModal portfolioData={portfolioData}/>}
    </>
  );
}
