import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function FirstSetup() {
  const [username, setUsername] = useState("");
  const [mainData, setMainData] = useState({
    name: "",
    title: "",
    email: "",
    icon: "",
  });
  const [error, setError] = useState("");

  const { currentUser } = useAuth();
  const router = useRouter();

  function handleInput(e) {
    const input = e.target.value;
    const key = e.target.id;
    setMainData((prev) => {
      return { ...prev, [key]: input };
    });
  }

  async function handleSubmit() {
    if (!currentUser) {
      return;
    }
    updateMainData();
    updateUsername();
  }

  async function updateUsername() {
    try {
      await updateProfile(currentUser, {
        displayName: username,
      });
    } catch {
      setError("Something went wrong");
    } finally {
      router.push("/");
    }
    
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        username: username,
      }
    );
  }

  async function updateMainData() {
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        mainData: mainData,
      },
      { merge: true }
    );
  }

  return (
    <div className="bg-gray-500 h-screen text-sx sm:text-sm flex flex-1 flex-col items-center place-items-center justify-center gap-2 sm:gap-4 text-white">
      <h1 className="text-3xl py-5">Welcome to your portfolio! 💌</h1>
      <form className="flex flex-col w-full max-w-xs">
        <label for="signup-username" className="text-center text-lg">
          Please choose a username:
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="outline-nine text-slate-900 p-2 w-full mb-5 rounded"
          required
          maxLength={20}
          minLength={3}
        />

        <h2 className="text-center text-lg pt-6">
          Add your display information:
        </h2>
        <p className="text-center pb-6">
          (This is optional and can be added and edited later)
        </p>

        <label for="signup-username" className="text-left">
          Full name
        </label>
        <input
          id="name"
          type="text"
          value={mainData.username}
          onChange={handleInput}
          placeholder="Full name"
          className="outline-nine text-slate-900 p-2 w-full mb-5 rounded"
          maxLength={50}
        />

        <label for="signup-username" className="text-left">
          Occupation
        </label>
        <input
          id="name"
          type="text"
          value={mainData.username}
          onChange={handleInput}
          placeholder="'Illustration/concept art', 'Animator', etc"
          className="outline-nine text-slate-900 p-2 w-full mb-5 rounded"
          maxLength={50}
        />

        <label for="signup-username" className="text-left">
          Contact email
        </label>
        <input
          id="email"
          type="email"
          value={mainData.email}
          onChange={handleInput}
          placeholder="Contact email"
          className="outline-nine text-slate-900 p-2 w-full mb-5 rounded"
        />

        <label for="signup-username" className="text-left">
          Icon URL
        </label>
        <input
          id="icon"
          type="url"
          value={mainData.icon}
          onChange={handleInput}
          placeholder="Link to your icon image"
          className="outline-nine text-slate-900 p-2 w-full mb-5 rounded"
        />

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full border border-white border-solid py-2 duration-300 relative mb-5 rounded  hover:bg-white hover:text-slate-700"
        >
          Submit
        </button>
      </form>

      {error && <div className="bg-red-400 px-2 py-1">{error}</div>}
    </div>
  );
}
