import React, { useEffect, useState } from "react";
import Image from "next/image";
import LoaderAnimation from "./LoaderAnimation";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";

export default function AddImageModal(props) {
  const { handleAddImage, setAddingImage, submitLoading } = props;

  const [newImage, setNewImage] = useState({ title: "", link: "" }); 
  const [loading, setLoading] = useState(false) 
  const [testImage, setTestImage] = useState('')
  const [valid, setValid] = useState(null) 
  const [error, setError] = useState('')
  const [submitError, setSubmitError] = useState('')

  function handleInput(e) {
    setError('')
    setLoading(true)
    
    if (e.target.id == "link") {
      setValid(false)
      setTestImage(e.target.value)
    }
    setNewImage(prev => {
      return {...prev, [e.target.id] : e.target.value}
    })
    setLoading(false)
  }

  async function handlePaste(e) {
    setTestImage(e.target.value)
  }

  useEffect(() => {
    setTimeout(() => {
      handleCheckImage()
    }, 500)
  }, [testImage])

  function handleSubmit() {
    setError('')
    if (!valid || loading) return
    if (!newImage.link || !newImage.title) {
      setTimeout(() => {
        setSubmitError("Please fill all fields")
      }, 300)
      return
    }
    if (newImage.title.length > 50) {
      setTimeout(() => {
        setSubmitError("Title cannot be longer than 50 characters")
      }, 300)
      return
    }
    handleAddImage(newImage)
  }

  async function handleCheckImage() {
    setLoading(true)
    setSubmitError('')
    await fetch(testImage, {method: 'HEAD'})
      .then(res => {
        return res.headers.get('Content-type').startsWith('image')
      }).then(res => {
        setValid(res)
        setLoading(false)
        if (!res && testImage !== '') {
          setError('Could not get image')
          return
        }
        setNewImage(prev => {
          return {...prev, link: testImage}
        })
      }).catch(error => {
        setError('Could not get image')
        setLoading(false)
      })
  }



  return (
    <div className="fixed z-30 top-0 left-0 bg-textPrimary bg-opacity-40 backdrop-blur-sm h-full w-full flex flex-col justify-center items-center">
      <button onClick={() => setAddingImage(false)} className="absolute top-0 z-30 right-0 p-5 cursor-pointer text-bgPrimary hover:text-bgAccent">
        <i  className="fa-solid fa-xmark text-3xl"></i>
      </button>
      <div onClick={(e) => e.stopPropagation()} className="max-w-2xl max-h-screen sm:w-4/5 w-[90%] bg-bgPrimary p-3 border-2 border-bgAccent rounded-xl shadow-2xl">

        {newImage && (
          <div className="h-56 mt-5">

            <div className="relative">
              <div className="absolute inset-0 top-[4.5rem]">
                {loading && <LoaderAnimation />}
              </div>
              {!valid && <div className="border-2 rounded border-dashed m-auto h-56 w-[10rem]"></div>}
            </div>

            {valid && <img src={testImage} alt='' className="h-56 m-auto"></img>}
          </div>
        )}

        <form className="p-5 w-full bg-bgPrimary text-lg text-textPrimary grid content-center" >
          <span className="text-2xl p-2">Add image</span>

          <label for="link" className="text-left font-bold">Paste URL of image *</label>
          <input
            id="link" type="text" placeholder="http://..." required
            value={testImage}
            onPaste={handlePaste}
            onChange={handleInput}
            className="outline-none w-full m-auto bg-transparent mb-4 border-b-2 border-orange-500 px-2 text-textPrimary"
          ></input>

          <label for="title" className="text-left font-bold">Title of work *</label>
            <input id="title" type="text" placeholder="Add title..."
              value={newImage.title} onChange={handleInput} className="outline-none w-full m-auto bg-transparent mb-4 border-b-2 border-orange-500 px-2 text-textPrimary"
              maxLength={50} inLength={5} required
            ></input>


          {error && <span className="pt-5">{error}</span>}

          {valid && !loading && !error && (
            <>

              <div>
                <button type="button" onClick={() => setAddingImage(false)} className="text-xl box-border border-2 border-bgAccent w-fit m-auto px-4 py-1 rounded mx-2 hover:bg-bgAccent hover:bg-opacity-50 duration-150">
                  Cancel
                </button>

                <button type="button" onClick={handleSubmit} className="text-xl bg-bgAccent bg-opacity-50 border-2 border-bgAccent w-fit m-auto px-4 py-1 rounded mx-2 hover:bg-opacity-100 duration-150">
                  Submit
                </button>
              </div>
            </>
          )}

          {submitLoading && <LoaderAnimation />}
          {!submitLoading && submitError && <span className="pt-5">{submitError}</span>}

        </form>
      </div>

    </div>
  );
}
