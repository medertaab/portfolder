import React, { useEffect, useState } from "react";
import LoaderAnimation from '../../ui/LoaderAnimation';
import { doc, setDoc} from "firebase/firestore";
import { db } from "../../../firebase";
import { useAuth } from "../../../context/AuthContext";
import { useForm } from "react-hook-form";
import useCheckImage from "../../../hooks/useCheckImage";

export default function AddImageModal(props) {
  const { images, setImages, setMode } = props;
  const [loading, setLoading] = useState(false);
  const [buttonContent, setButtonContent] = useState("Submit")
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const { register, handleSubmit, watch, formState: { errors } } = useForm(); 

  const { checkImage, isValid, isValidLoading, 
    setIsValidLoading, isEmpty, imageBox 
  } = useCheckImage();

  // Set image to empty on load
  useEffect(() => {
    checkImage(watch("link"));
  }, []);

  // Image checking upon input change
  function handleImageChange() {
    setError("")
    setIsValidLoading(true);
    setTimeout(() => {
      checkImage(watch("link"));
    }, 700);
  }

  function onSubmit(e) {
    e.preventDefault();
    setError("");
    handleSubmit(handleAddImage)();
  }

  async function handleAddImage(image) {
    setLoading(true);
    if (Object.keys(images).length > 49) return;
    const newKey =
      Object.keys(images).length === 0
        ? 1
        : Math.max(...Object.keys(images)) + 1;
    setImages({ ...images, [newKey]: image });
    const userRef = doc(db, "users", currentUser.uid);
    try {
      await setDoc(
        userRef,
        {
          images: { [newKey]: image },
        },
        { merge: true }
      ).then(() => {
        // If success
        setButtonContent("✓")
        setTimeout(() => {
          setMode("");
        }, 1000)
      });
    } catch (error) {
      setLoading(false)
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed z-30 top-[2.5rem] left-0 bg-textPrimary bg-opacity-40 backdrop-blur-sm h-full w-full flex flex-col justify-center items-center"
      onClick={() => setMode("")}
    >
      {/* Exit button */}
      <button
        onClick={() => setMode("")}
        className="absolute top-0 z-30 right-0 p-5 cursor-pointer text-bgPrimary hover:text-bgAccent"
      >
        <i className="fa-solid fa-xmark text-3xl"></i>
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl max-h-screen sm:w-4/5 w-[90%] bg-bgPrimary p-3 rounded-xl shadow-2xl"
      >
        {/* Image preview */}
        {imageBox(watch("link"))}

        {/* Input form */}
        <form className="p-5 pt-0 w-full bg-bgPrimary text-lg text-textPrimary grid content-center">
          <span className="text-2xl p-2">Add image</span>
          <label for="link" className="text-left font-bold">
            Paste URL of image *
          </label>
          {errors?.link?.message && (
            <span className="text-red-500 text-sm">{errors.link.message}</span>
          )}
          <input
            id="link"
            type="URL"
            placeholder="http://..."
            {...register("link", {
              required: "Please enter a valid image URL",
              onChange: () => handleImageChange(),
            })}
            className="outline-none w-full m-auto mb-4 px-2 bg-bgSecondary p-2 rounded text-textPrimary"
          ></input>

          <label for="title" className="text-left font-bold">
            Title of work *
          </label>
          {errors?.title?.message && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
          <input
            id="title"
            type="text"
            placeholder="Add title..."
            {...register("title", {
              required: "Please enter this work's title",
              maxLength: {
                value: 50,
                message: "Title should be under 50 characters",
              },
            })}
            className="outline-none w-full m-auto mb-4 px-2 bg-bgSecondary p-2 rounded text-textPrimary"
          ></input>

          {error && <span className="pt-5">{error}</span>}

          {/* BUTTONS */}
          <div className="flex justify-center items-center gap-2 mt-2">
            <button
              type="button"
              onClick={() => setMode("")}
              className="w-24 h-11 text-xl rounded hover:bg-bgSecondary duration-150"
            >
              Cancel
            </button>

            {/* Active Submit button only if image is valid */}
            {isValid && !isEmpty && !isValidLoading && !error ? (
              <button
                type="submit"
                onClick={onSubmit}
                className="w-24 h-11 text-xl bg-bgAccent rounded hover:shadow-sm hover:bg-opacity-80 duration-150"
              >
                {loading ? <LoaderAnimation small /> : buttonContent}
              </button>
            ) : (
              <button
                type="button"
                className="w-24 h-11 text-xl border-2 border-gray-500 rounded cursor-auto"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
