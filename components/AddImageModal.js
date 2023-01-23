import React, { useState } from "react";
import Image from "next/image";

export default function AddImageModal(props) {
  const { handleAdd, setAddingImage } = props;
  const [newImage, setNewImage] = useState({ title: "", link: "" });  
  const [loadedImage, setLoadedImage] = useState(null)
  const [error, setError] = useState('')

  function handleInput(e) {
    setNewImage((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  }

  async function checkImage(e) {
    const url = e.target.value
    const valid = await fetch(url, {method: 'HEAD'}).then(res => {
      console.log(res.headers.get('Content-type').startsWith('image'))
      return res.headers.get('Content-type').startsWith('image')
    })
    console.log(valid)
    if (valid) {
      setLoadedImage(url)
    }
  }

  function handleSubmit() {
    setError('')
    if (!newImage.link || !newImage.title) {
      setTimeout(() => {
        setError("Please fill all fields")
      }, 300)
      return
    }
    if (newImage.title.length > 50) {
      setTimeout(() => {
        setError("Title cannot be longer than 50 characters")
      }, 300)
      return
    }
    handleAdd(newImage)
  }

  return (
    <div onClick={() => setAddingImage(false)} className="fixed z-20 top-0 left-0 flex bg-textPrimary bg-opacity-40 backdrop-blur-sm w-full h-full justify-center items-center p-5">
      {loadedImage && (
        <div className="relative h-12 w-12">
          <Image src={loadedImage} fill alt='' className=""></Image>
        </div>
      )}
      <form className="px-20 max-w-2xl w-full h-1/2 min-h-[20rem] bg-bgPrimary shadow-2xl border-2 border-dashed border-bgAccent rounded-xl text-lg text-textPrimary grid content-center" onClick={(e) => e.stopPropagation()}>
        <span className="text-left text-2xl p-2">Add image</span>

        <label for="link" className="text-left">
          Paste URL of image *
        </label>
        <input
          id="link"
          type="text"
          placeholder="http://..."
          value={newImage.link}
          onChange={handleInput}
          onPaste={checkImage}
          className="w-full m-auto mb-4 border-2 rounded border-orange-500 px-2 text-bgPrimary"
          required
        ></input>

        <label for="title" className="text-left">
          Title of work *
        </label>
        <input
          id="title"
          type="text"
          placeholder="Add title..."
          value={newImage.title}
          onChange={handleInput}
          className="w-full m-auto mb-4 border-2 rounded border-orange-500 px-2 text-bgPrimary"
          maxLength={50}
          minLength={5}
          required
        ></input>

        <div>
          <button type="button" onClick={() => setAddingImage(false)} className="text-xl bg-slate-400 w-fit m-auto px-4 py-1 rounded mx-2">
            Cancel
          </button>

          <button type="button" onClick={handleSubmit} className="text-xl bg-orange-400 w-fit m-auto px-4 py-1 rounded mx-2">
            Submit
          </button>
        </div>

        <span className="h-[1rem] p-2">{error}</span>
      </form>
    </div>
  );
}
