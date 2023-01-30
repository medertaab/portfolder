import React, { useEffect, useState } from "react";
import Thumbnail from "./Thumbnail";
import { doc, setDoc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import AddImageModal from "./AddImageModal";
import UpdateImageModal from "./UpdateImageModal";
import ShowImageModal from "./ShowImageModal";
import useFetchImages from "../hooks/fetchImages";
import LoaderAnimation from "./LoaderAnimation";

export default function Gallery(props) {
  const { currentUser } = useAuth();
  const { username, pageOwner} = props;

  const {images, setImages, loading, error} = useFetchImages(username)

  const [addingImage, setAddingImage] = useState(false);
  const [openImage, setOpenImage] = useState(null)

  const [updatingImage, setUpdatingImage] = useState(false)
  const [updatingNum, setUpdatingNum] = useState(null)

  const [submitLoading, setSubmitLoading] = useState(false)

  useEffect(() => {
    setImages(images)
  }, [loading, images, setImages])

  async function handleAddImage(image) {
    if (!image) return;
    if (!pageOwner) return;

    const newKey = Object.keys(images).length === 0 ? 1 : Math.max(...Object.keys(images)) + 1;
    setImages({...images, [newKey]: image})
    const userRef = doc(db, "users", currentUser.uid);
    try {
      setSubmitLoading(true)
      await setDoc(
        userRef,
        {
          images: {[newKey]: image},
        },
        { merge: true }
      )
    } catch (err) {
      console.log(err)
    } finally {
      setSubmitLoading(false)
      setAddingImage(false)
    }
  }

  async function handleUpdateImage(image) {
    if (!image) return;
    if (!pageOwner) return;

    setImages({...images, [updatingNum]: image})
    const userRef = doc(db, "users", currentUser.uid);
    try {
      setSubmitLoading(true)
      await updateDoc(
        userRef,
        {
          images: {[updatingNum]: image},
        },
        { merge: true }
      );
    } catch (err) {
      console.log(err) 
    } finally {
      setSubmitLoading(false)
      setUpdatingImage(false)
    }
  }

  async function handleDeleteImage() {
    if (!pageOwner) return;

    setImages(prev => {
      const copy = {...prev}
      delete copy[updatingNum]
      return copy
    })

    const userRef = doc(db, "users", currentUser.uid);
    try {
      setSubmitLoading(true)
      await updateDoc(
        userRef,
        {
          [`images.${updatingNum}`]: deleteField(),
        }
      );
    } catch (err) {
      console.log(err) 
    } finally {
      setSubmitLoading(false)
      setUpdatingImage(false)
    }
  }

  const addButton = (
    <button onClick={() => setAddingImage(true)} className="height-full aspect-square text-lg border-2 border-dashed border-bgAccent bg-bgSecondary rounded-xl duration-150 hover:bg-bgAccent">
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
      {addingImage && <AddImageModal handleAddImage={handleAddImage} setAddingImage={setAddingImage} submitLoading={submitLoading}/>}
      {updatingImage && <UpdateImageModal updatingImage={updatingImage} setUpdatingImage={setUpdatingImage} updatingNum={updatingNum} handleUpdateImage={handleUpdateImage} submitLoading={submitLoading} handleDeleteImage={handleDeleteImage}/>}
      {loading && <LoaderAnimation />}
      {!loading && (
        <div className="p-2 grid grid-cols-[repeat(auto-fill,_minmax(200px,1fr))] gap-4">
          {images && Object.keys(images).map((num) => {
            return (
              <Thumbnail
                image={images[num]}
                num={num}
                pageOwner={pageOwner}
                setOpenImage={setOpenImage}
                setUpdatingImage={setUpdatingImage}
                setUpdatingNum={setUpdatingNum}
                key={num}
              />
            );
          })}
        {addButton}
        </div>
      )}
    </>
  );
}
