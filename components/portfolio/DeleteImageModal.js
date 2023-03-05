import React, {useState} from 'react'
import LoaderAnimation from '../LoaderAnimation';
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from '../../context/AuthContext';

export default function DeleteImageModal(props) {
  const {setMode, setImages, updatingNum} = props
  const [loading, setLoading] = useState(false)
  const [buttonContent, setButtonContent] = useState("Delete image")
  const [error, setError] = useState("")
  const {currentUser} = useAuth()

  async function handleDeleteImage() {
    setLoading(true)
    setImages(prev => {
      const copy = {...prev}
      delete copy[updatingNum]
      return copy
    })

    const userRef = doc(db, "users", currentUser.uid);
    try {
      await updateDoc(
        userRef,
        {
          [`images.${updatingNum}`]: deleteField(),
        }
      ).then(() => {
        // If success
        setButtonContent("✓")
        setTimeout(() => {
          setMode("");
        }, 1000)
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
      onClick={() => setMode("")}
      className="fixed z-30 top-[2.5rem] left-0 bg-textPrimary bg-opacity-40 backdrop-blur-sm h-full w-full flex flex-col justify-center items-center"
    >
      <button
        onClick={() => setMode("")}
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
            onClick={() => setMode("updating")}
            className="w-24 h-11 text-xl rounded hover:bg-bgSecondary duration-150"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDeleteImage}
            className="w-40 px-3 h-11 text-xl border-bgAccent border-2 rounded hover:bg-bgSecondary duration-150"
          >
            {loading ? <LoaderAnimation small /> : buttonContent}
          </button>
        </div>

        {error && <span className='text-red-500 text-sm'>{error}</span>}
      </div>
    </div>
  );
}
