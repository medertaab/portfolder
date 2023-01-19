import React, { useState, useEffect } from "react";
import Header from "./Header";
import Information from "./Information";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import Gallery from "./Gallery";
import { doc, setDoc, deleteField } from "firebase/firestore";
import { db } from "../firebase";
import useFetchImages from "../hooks/fetchImages";

export default function Portfolio(props) {
  const { username } = props
  const { currentUser } = useAuth();
  const { images, loading, error } = useFetchImages();

  const [pageOwner, setPageOwner] = useState(false)
  useEffect(() => {
    if (currentUser && username == currentUser.displayName) {
      setPageOwner(true)
    }
  }, [])

  return (
    <div className="w-full max-w-screen-xl min-h-full flex flex-col m-auto bg-neutral-400">
      <Layout>
        <Header />
        <main className="border-2 border-solid border-red-700">
          {loading && <h1>LOADING</h1>}
          {!loading && (
            <div>
              <Gallery currentUser={currentUser} loading={loading} />
            </div>
          )}
        </main>
        <Information />
      </Layout>
    </div>
  );
}
