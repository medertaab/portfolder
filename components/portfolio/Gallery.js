import React, { useEffect, useState } from "react";
import Thumbnail from "./Thumbnail";
import AddImageModal from "./modals/AddImageModal";
import UpdateImageModal from "./modals/UpdateImageModal";
import FullImageModal from "./modals/FullImageModal";
import DeleteImageModal from "./modals/DeleteImageModal";
import useFetchImages from "../../hooks/fetchImages";
import LoaderAnimation from '../ui/LoaderAnimation';

export default function Gallery(props) {
  const { username, pageOwner, grid } = props;
  const { images, setImages, loading } = useFetchImages(username);

  const [mode, setMode] = useState("");
  const [imageIndex, setImageIndex] = useState(null);
  const [updatingNum, setUpdatingNum] = useState(null);
  const [updatingImage, setUpdatingImage] = useState(null);

  useEffect(() => {
    setImages(images);
  }, [loading, images, setImages]);

  function gridLayout() {
    if (grid === "dynamic") {
      return "fade-in p-2 grid sm:grid-cols-[repeat(auto-fill,_minmax(350px,1fr))] grid-cols-1 gap-1 justify-between auto-rows-min grid-flow-dense";
    } else if (grid === "static") {
      return "fade-in p-2 grid sm:grid-cols-[repeat(auto-fill,_minmax(350px,1fr))] grid-cols-1 gap-1 justify-between";
    }
  }

  // If there are no images
  if (!images) {
    return;
  }

  // If there are images
  return (
    <>
      {loading && <LoaderAnimation />}

      {/* Full image view */}
      {imageIndex && (
        <FullImageModal
          images={images}
          imageIndex={imageIndex}
          setImageIndex={setImageIndex}
        />
      )}

      {/* Updating modals */}
      {mode === "adding" && (
        <AddImageModal
          images={images}
          setMode={setMode}
          setImages={setImages}
        />
      )}
      {mode === "updating" && (
        <UpdateImageModal
          images={images}
          setMode={setMode}
          setImages={setImages}
          updatingNum={updatingNum}
          updatingImage={updatingImage}
        />
      )}
      {mode === "deleting" && (
        <DeleteImageModal
          images={images}
          setMode={setMode}
          setImages={setImages}
          updatingNum={updatingNum}
        />
      )}

      {/* Add button */}
      {!loading && pageOwner && (
        <div className="text-start mx-2">
          <button
            onClick={() => setMode("adding")}
            type="button"
            className="justify-self-start py-2 px-4 text-textPrimary font-semibold bg-bgAccent w-fit rounded hover:bg-opacity-80 duration-150"
          >
            + Add image
          </button>
        </div>
      )}

      {/* Gallery grid */}
      {!loading && (
        <main className={gridLayout()}>
          {images &&
            Object.keys(images).map((num) => {
              return (
                <Thumbnail
                  num={num}
                  key={num}
                  grid={grid}
                  setMode={setMode}
                  image={images[num]}
                  pageOwner={pageOwner}
                  setImageIndex={setImageIndex}
                  setUpdatingNum={setUpdatingNum}
                  setUpdatingImage={setUpdatingImage}
                />
              );
            })}
        </main>
      )}
    </>
  );
}
