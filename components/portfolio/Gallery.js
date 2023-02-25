import React, { useEffect, useState, useRef } from "react";
import Thumbnail from "./Thumbnail";
import { doc, setDoc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import AddImageModal from "./AddImageModal";
import UpdateImageModal from "./UpdateImageModal";
import FullImageModal from "./FullImageModal";
import useFetchImages from "../../hooks/fetchImages";
import LoaderAnimation from "../LoaderAnimation";

export default function Gallery(props) {
  const { currentUser } = useAuth();
  const { username, pageOwner, grid } = props;

  const {images, setImages, loading, error} = useFetchImages(username)

  const [addingImage, setAddingImage] = useState(false);
  const [openImage, setOpenImage] = useState(null)

  const [updatingImage, setUpdatingImage] = useState(false)
  const [updatingNum, setUpdatingNum] = useState(null)

  const [submitLoading, setSubmitLoading] = useState(false)

  useEffect(() => {
    setImages(images)
  }, [loading, images, setImages])

  console.log('images', images)

  async function handleAddImage(image) {
    if (!image) return;
    if (!pageOwner) return;
    if (Object.keys(images).length > 49) return;

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
    <div className="text-start mx-2">
      <button onClick={() => setAddingImage(true)} type="button" className="justify-self-start py-2 px-4 border-2 border-bgAccent w-fit rounded hover:bg-bgAccent duration-150">
        + Add image
      </button>
    </div>
  );

  function gridLayout() {
    if (grid === 'dynamic') {
      return ("p-2 grid sm:grid-cols-[repeat(auto-fill,_minmax(250px,1fr))] grid-cols-1 sm:gap-4 gap-2 justify-between auto-rows-min grid-flow-dense")
    } else if (grid === 'static') {
      return ("p-2 grid sm:grid-cols-[repeat(auto-fill,_minmax(250px,1fr))] grid-cols-1 sm:gap-4 gap-2 justify-between")
    }
  }

  const [galleryWidth, setGalleryWidth] = useState(0);
  const [galleryHeight, setGalleryHeight] = useState(0);

  useEffect(() => {
    if (images) {
      const newimages = Object.values(images);
      const numImages = newimages.length;
      const aspectRatios = newimages.map((image) => image.link.height ? image.link.width / image.link.height : 1);
      const totalAspectRatios = aspectRatios.reduce((acc, ratio) => acc + ratio, 0);
      const numRows = Math.ceil(numImages / Math.floor(totalAspectRatios));
  
      const calculateGallerySize = () => {
        const width = galleryRef.current.clientWidth;
        const height = (width / totalAspectRatios) * numRows;
  
        setGalleryWidth(width);
        setGalleryHeight(height);
        console.log(galleryHeight)
      };
  
      calculateGallerySize();
      window.addEventListener('resize', calculateGallerySize);
      return () => window.removeEventListener('resize', calculateGallerySize);
    }
  }, [images])

    const galleryRef = useRef(null)


  // If there are no images
  if (!images && !pageOwner) {
    return 
  }

  // If there are images
  return (
    <>
      {openImage && <FullImageModal openImage={openImage} setOpenImage={setOpenImage}/>}
      {addingImage && <AddImageModal handleAddImage={handleAddImage} setAddingImage={setAddingImage} submitLoading={submitLoading}/>}
      {updatingImage && <UpdateImageModal updatingImage={updatingImage} setUpdatingImage={setUpdatingImage} updatingNum={updatingNum} handleUpdateImage={handleUpdateImage} submitLoading={submitLoading} handleDeleteImage={handleDeleteImage}/>}
      {loading && <LoaderAnimation />}
      {!loading && pageOwner && addButton}
      {!loading && (
        
        // Gallery grid
        <main className={`flex flex-wrap max-w-full h-[${galleryHeight}px]`} ref={galleryRef}>
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
                grid={grid}
              />
            );
          })}
        </main>
      )}
    </>
  );
}
