import React, { useState } from "react";
import LoaderAnimation from "../../../ui/LoaderAnimation";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useAuth } from "../../../../context/AuthContext";
import { useRouter } from "next/router";

export default function DeletForm(props) {
  const { id, closeModal } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const [buttonContent, setButtonContent] = useState("Delete image")
  const router = useRouter()

  async function handleDeleteImage() {
    setLoading(true)
    const userRef = doc(db, "users", currentUser.uid);
    try {
      await updateDoc(
        userRef,
        {
          [`images.${id}`]: deleteField(),
        }
      ).then(() => {
        // If success
        setButtonContent(<i class="fa-solid fa-check"></i>)
        router.push("/")
      });
    } catch(error) {
      setError(error.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="max-w-2xl max-h-screen sm:w-4/5 w-[90%] bg-bgPrimary p-8 pb-6 rounded-3xl overflow-auto"
    >
      <button className="mb-4" onClick={router.back}>
        <i className="fa-solid fa-arrow-left"></i> Back
      </button>

      <p className="mt-4">
        Are you sure you want to delete the image? This cannot be undone
      </p>

      <div className="flex justify-end items-center gap-2 mt-6">
        <button
          type="button"
          onClick={handleDeleteImage}
          className="w-36 h-11 rounded-full bg-bgAccent text-primaryLight hover:opacity-75 "
          >
          {loading ? <LoaderAnimation small /> : buttonContent}
        </button>
        <button
          type="button"
          onClick={closeModal}
          className="w-24 h-11 rounded-full hover:bg-bgSecondary transition ease-in-out"
          >
          Cancel
        </button>
      </div>

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
