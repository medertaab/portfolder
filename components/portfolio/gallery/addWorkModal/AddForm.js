import React, { useEffect, useState } from "react";
import LoaderAnimation from "../../../ui/LoaderAnimation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useAuth } from "../../../../context/AuthContext";
import { useForm } from "react-hook-form";
import useCheckImage from "../../../../hooks/useCheckImage";
import { useRouter } from "next/router";

export default function AddForm(props) {
  const { images, closeModal, setImages } = props;
  const [loading, setLoading] = useState(false);
  const [buttonContent, setButtonContent] = useState("Submit");
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const {
    checkImage,
    isValid,
    isValidLoading,
    setIsValidLoading,
    isEmpty,
    imageBox,
  } = useCheckImage();

  // Set image to empty on load
  useEffect(() => {
    checkImage(watch("link"));
  }, []);

  // Image checking upon input change
  function handleImageChange() {
    setError("");
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
        setButtonContent(<i class="fa-solid fa-check"></i>);
        setTimeout(() => {
          document.body.style.overflow = "unset";
          router.push("/")
        }, 1000);
      });
    } catch (error) {
      setLoading(false);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="max-w-2xl max-h-screen sm:w-4/5 w-[90%] bg-bgPrimary p-3 rounded-3xl overflow-auto "
    >
      {/* Image preview */}
      <div className="h-[20rem] max-w-[100%] m-auto p-4">
      {imageBox(watch("link"))}
      </div>

      {/* Input form */}
      <form className="p-5 pt-0 w-full bg-bgPrimary text-textPrimary grid content-center text-sm">
        <span className="text-xl m-auto mt-5">Add image</span>
        
        <label for="link" className="mt-2 mb-1">
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
          className="outline-none w-full m-auto mb-4 px-2 bg-bgSecondary p-2 rounded text-textPrimary border-[1px] border-textPrimary"
        ></input>

        <label for="title" className="mt-2 mb-1">
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
          className="outline-none w-full m-auto mb-4 px-2 bg-bgSecondary p-2 rounded text-textPrimary border-[1px] border-textPrimary"
        ></input>

        {error && <span className="pt-5">{error}</span>}

        {/* BUTTONS */}
        <div className="flex justify-center items-center gap-2 mt-2">
          {/* Active Submit button only if image is valid */}
          {isValid && !isEmpty && !isValidLoading && !error ? (
            <button
              type="submit"
              onClick={onSubmit}
              className="w-24 h-11 rounded-full bg-bgAccent text-primaryLight opacity-100 duration-150 "
            >
              {loading ? <LoaderAnimation small /> : buttonContent}
            </button>
          ) : (
            <button
              type="button"
              className="w-24 h-11 rounded-full bg-bgAccent text-primaryLight opacity-50"
            >
              Submit
            </button>
          )}

          <button
            type="button"
            onClick={closeModal}
            className="w-24 h-11 rounded-full hover:bg-bgSecondary duration-150"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
