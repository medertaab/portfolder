import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import LoaderAnimation from "../LoaderAnimation";

export default function UpdateImageModal(props) {
  const {
    updatingImage,
    setUpdatingImage,
    handleUpdateImage,
    submitLoading,
    handleDeleteImage,
  } = props;

  const [newImage, setNewImage] = useState({});
  const [loading, setLoading] = useState(false);
  const [testImage, setTestImage] = useState(updatingImage.link);
  const [valid, setValid] = useState(null);
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [deleting, setDeleting] = useState(false);

  function handleInput(e) {
    setError("");
    setLoading(true);
    if (e.target.id == "link") {
      setValid(false);
      setTestImage(e.target.value);
    }
    setNewImage((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
    setLoading(false);
  }

  async function handlePaste(e) {
    setTestImage(e.target.value);
  }

  useEffect(() => {
    setNewImage({ title: updatingImage.title, link: updatingImage.link });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      handleCheckImage();
    }, 500);
  }, [testImage]);

  function handleSubmit() {
    setError("");
    if (!valid || loading) return;
    if (!newImage.link || !newImage.title) {
      setTimeout(() => {
        setSubmitError("Please fill all fields");
      }, 300);
      return;
    }
    if (newImage.title.length > 50) {
      setTimeout(() => {
        setSubmitError("Title cannot be longer than 50 characters");
      }, 300);
      return;
    }
    handleUpdateImage(newImage);
    setUpdatingImage(false);
  }

  function handleDelete() {
    handleDeleteImage();
  }

  async function handleCheckImage() {
    setLoading(true);
    setSubmitError("");
    await fetch(testImage, { method: "HEAD" })
      .then((res) => {
        return res.headers.get("Content-type").startsWith("image");
      })
      .then((res) => {
        setValid(res);
        setLoading(false);
        if (!res && testImage !== "") {
          setError("Could not get image");
          return;
        }
        setNewImage((prev) => {
          return { ...prev, link: testImage };
        });
      })
      .catch((error) => {
        setError("Could not get image");
        setLoading(false);
      });
  }

  if (deleting) {
    return (
      <div
        onClick={() => setUpdatingImage(null)}
        className="fixed z-30 top-[2.5rem] left-0 bg-textPrimary bg-opacity-40 backdrop-blur-sm h-full w-full flex flex-col justify-center items-center"
      >
        <button
          onClick={() => setUpdatingImage(null)}
          className="absolute top-0 z-30 right-0 p-5 cursor-pointer text-bgPrimary hover:text-bgAccent"
        >
          <i className="fa-solid fa-xmark text-3xl"></i>
        </button>

        <div
          onClick={(e) => e.stopPropagation()}
          className="text-lg max-w-2xl max-h-screen sm:w-4/5 w-[90%] bg-bgPrimary p-5 pb-7 rounded-xl shadow-2xl"
        >
          <p className="p-3">
            Are you sure you want to delete the image? This cannot be undone
          </p>

          <div className="flex justify-center items-center gap-2 mt-2">
            <button
              type="button"
              onClick={() => setDeleting(false)}
              className="w-24 h-11 text-xl rounded hover:bg-bgSecondary duration-150"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="w-40 px-3 h-11 text-xl border-bgAccent border-2 rounded hover:bg-bgSecondary duration-150"
            >
              {submitLoading ? <LoaderAnimation small /> : "Delete image"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setUpdatingImage(null)}
      className="fixed z-30 top-[2.5rem] left-0 bg-textPrimary bg-opacity-40 backdrop-blur-sm h-full w-full flex flex-col justify-center items-center"
    >
      <button
        onClick={() => setUpdatingImage(null)}
        className="absolute top-0 z-30 right-0 p-5 cursor-pointer text-bgPrimary hover:text-bgAccent"
      >
        <i className="fa-solid fa-xmark text-3xl"></i>
      </button>
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl max-h-screen sm:w-4/5 w-[90%] bg-bgPrimary p-3 rounded-xl shadow-2xl"
      >
        {newImage && (
          <div className="h-56 mt-5">
            <div className="relative">
              <div className="absolute inset-0 top-[4.5rem]">
                {loading && <LoaderAnimation />}
              </div>
              {!valid && (
                <div className="border-2 rounded border-dashed m-auto h-56 w-[10rem]"></div>
              )}
            </div>

            {valid && (
              <img src={testImage} alt="" className="h-56 m-auto"></img>
            )}
          </div>
        )}

        <form className="p-5 w-full bg-bgPrimary text-lg text-textPrimary grid content-center">
          <span className="text-2xl p-2">Edit image</span>

          <label for="link" className="text-left font-bold">
            Paste URL of image *
          </label>
          <input
            id="link"
            type="text"
            placeholder="http://..."
            required
            value={testImage}
            onPaste={handlePaste}
            onChange={handleInput}
            className="outline-none w-full m-auto mb-4 px-2 bg-bgSecondary p-2 rounded text-textPrimary"
          ></input>

          {error && <span className="pt-5">{error}</span>}

          {valid && !loading && !error && (
            <>
              <label for="title" className="text-left font-bold">
                Title of work *
              </label>
              <input
                id="title"
                type="text"
                placeholder="Add title..."
                value={newImage.title}
                onChange={handleInput}
                className="outline-none w-full m-auto mb-4 px-2 bg-bgSecondary p-2 rounded text-textPrimary"
                maxLength={50}
                inLength={5}
                required
              ></input>

              <div className="flex justify-center items-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setUpdatingImage(false)}
                  className="w-24 h-11 text-xl rounded hover:bg-bgSecondary duration-150"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-24 h-11 text-xl bg-bgAccent rounded hover:shadow-sm hover:bg-opacity-80 duration-150"
                >
                  {submitLoading ? <LoaderAnimation small /> : "Submit"}
                </button>
              </div>
            </>
          )}

          <button
            type="button"
            onClick={() => setDeleting(true)}
            className="justify-self-end text-lg border-2 border-transparent w-fit m-auto px-4 pt-1 rounded mx-2 hover:text-bgAccent duration-150"
          >
            <i class="fa-solid fa-trash"></i> Delete image
          </button>

          {submitError && <span className="pt-5">{submitError}</span>}
        </form>
      </div>
    </div>
  );
}
