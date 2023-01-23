import React, { useEffect, useState } from "react";
import Thumbnail from "./Thumbnail";
import { doc, setDoc, deleteField } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import AddImageModal from "./AddImageModal";
import ShowImageModal from "./ShowImageModal";
import useFetchPortfolioData from "../hooks/fetchPortfolioData";

export default function Gallery(props) {
  const { currentUser } = useAuth();
  const { pageOwner, portfolioData} = props;

  const {setPortfolioData, loading} = useFetchPortfolioData()


  const [addingImage, setAddingImage] = useState(false);
  const [openImage, setOpenImage] = useState(null)

  const [edit, setEdit] = useState(null);

  const { images } = portfolioData;


  function handleAdd(newImage) {
    handleNewImage(newImage);
    setAddingImage(false);
  }

  async function handleNewImage(link) {
    if (!link) return;
    if (!pageOwner) return;

    const newKey = Object.keys(images).length === 0 ? 1 : Math.max(...Object.keys(images)) + 1;
    setPortfolioData({...portfolioData, images: {[newKey]: link}
    })
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        images: {
          [newKey]: link
        },
      },
      { merge: true }
    );
  }

  async function handleDelete(key) {
    return async () => {};
  }

  async function handleAddEdit(imageKey) {
    return () => setEdit(imageKey);
  }

  const addButton = (
    <button
      onClick={() => setAddingImage(true)}
      className="h-full text-lg border-2 border-dashed border-bgAccent bg-bgSecondary rounded-xl duration-150 hover:bg-[#f45d48] hover:text-white"
    >
      + Add image
    </button>
  );

  // If there are no images
  if (!images && !pageOwner) {
    return
  }

  // If there are images
  return (
    <>
      {openImage && <ShowImageModal openImage={openImage} setOpenImage={setOpenImage}/>}
      {addingImage && <AddImageModal handleAdd={handleAdd} setAddingImage={setAddingImage}/>}
      <div className="grid grid-cols-[repeat(auto-fill,_250px)] grid-rows-auto justify-center gap-2 p-2">
        {/* <div className="flex flex-wrap gap-1 p-2"> */}
        {images && Object.keys(images).map((image, i) => {
          return (
            <Thumbnail
              image={images[image]}
              setOpenImage={setOpenImage}
              handleAddEdit={handleAddEdit}
              edit={edit}
              pageOwner={pageOwner}
              key={i}
            />
          );
        })}

        {addButton}
      </div>
    </>
  );
}
