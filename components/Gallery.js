import React, { useEffect, useState} from "react";
import Thumbnail from "./Thumbnail";
import {doc, setDoc, deleteField} from 'firebase/firestore'
import {db} from '../firebase'
import useFetchImages from "../hooks/fetchImages";

export default function Gallery(props) {
  const {images, loading, error} = useFetchImages()
  const {currentUser} = props
  
  const [addingImage, setAddingImage] = useState(false);
  const [newImage, setNewImage] = useState('')
  const [edit, setEdit] = useState(null)

  function handleAdd() {
    handleNewImage(newImage)
    setAddingImage(false)
  }

  async function handleNewImage(link) {
    if (!link) { return }
    const newKey = Object.keys(images).length === 0 ? 1 : Math.max(...Object.keys(images)) + 1  
    const userRef = doc(db, 'users', currentUser.uid)
    await setDoc(userRef, {
      'images': {
        [newKey]: link
      }
    }, {merge: true})
  }


  async function handleDelete(key) {
    return async () => {

    }
  }

  function handleAddEdit(imageKey) {
    return () => setEdit(imageKey)
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_250px)] grid-rows-auto justify-center  border-2 border-solid border-lime-500 ">

      {images && (
        !loading && Object.keys(images).map((image, i) => {
          return (
            <div key={i}>
              <Thumbnail image={images[image]} handleAddEdit={handleAddEdit} edit={edit} />
            </div>
          );
        })
      )}

      {!addingImage && (
        <button onClick={() => setAddingImage(true)}className="w-52 h-52 border-2 border-dashed rounded-xl duration-150 hover:bg-slate-400 text-lg">
          Add image
        </button>
      )}

      {addingImage && (
        <form className="relative w-52 h-52 border-2 border-dashed rounded-xl duration-150 hover:bg-slate-400 text-lg grid content-center">
          <i onClick={() => setAddingImage(false)}className="fa-regular fa-circle-xmark absolute top-2 right-2 text-2xl cursor-pointer"></i>
          <input
            type="text"
            placeholder="Link to image"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            className="w-[15ch] m-auto"
          ></input>
          <button
            type="button"
            onClick={handleAdd}
            className="bg-slate-500 w-fit m-auto px-2 rounded"
          >
            Add
          </button>
        </form>
      )}
    </div>
  );
}
