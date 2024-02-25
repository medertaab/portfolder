import React, { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../context/AuthContext";
import useCheckImage from "../../../../hooks/useCheckImage";
import LoaderAnimation from "../../../ui/LoaderAnimation";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

export default function UpdateForm(props) {
  const { portfolioData, id, closeModal } = props;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [buttonContent, setButtonContent] = useState("Submit");

  const { currentUser } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const {
    checkImage,
    isValid,
    isValidLoading,
    setIsValidLoading,
    isEmpty,
    imageBox,
  } = useCheckImage();

  const router = useRouter();

  // Set to image inputs on load
  useEffect(() => {
    const imageData = portfolioData.images[router.query.id];
    reset({ title: imageData.title, link: imageData.link });
    checkImage(watch("link"));
  }, []);

  // Image checking upon input change
  function handleImageChange() {
    setIsValidLoading(true);
    setTimeout(() => {
      checkImage(watch("link"));
    }, 700);
  }

  function onSubmit(e) {
    e.preventDefault();
    setError("");
    handleSubmit(handleUpdateImage)();
  }

  async function handleUpdateImage(image) {
    setLoading(true);
    const userRef = doc(db, "users", currentUser.uid);
    try {
      setLoading(true);
      await updateDoc(
        userRef,
        {
          images: { [id]: image },
        },
        { merge: true }
      ).then(() => {
        // If success
        setButtonContent("✓");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      });
    } catch (error) {
      setLoading(false);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="max-w-2xl max-h-screen sm:w-4/5 w-[90%] bg-bgPrimary p-3 rounded-3xl overflow-auto"
    >
      {/* Image preview */}
      <div className="h-[20rem] max-w-[100%] m-auto p-4">
        {imageBox(watch("link"))}
      </div>

      <form className="p-5 pt-0 w-full bg-bgPrimary text-base text-textPrimary grid content-center">
        <span className="text-2xl m-auto mt-5">Edit image</span>

        <label for="link" className="mt-2">
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

        <label for="title" className="mt-2">
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

          <div className="flex justify-center items-center gap-2 ">
            <button
              type="button"
              onClick={closeModal}
              className="w-24 h-11 rounded-full hover:bg-bgSecondary duration-150"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
