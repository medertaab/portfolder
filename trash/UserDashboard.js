import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import InfoBlock from "../components/InfoBlock";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import Gallery from "../components/Gallery";
import { doc, setDoc, deleteField } from "firebase/firestore";
import { db } from "../firebase";
import useFetchImages from "../hooks/fetchImages";

export default function UserDashboard() {
  const { currentUser } = useAuth();
  const { images, loading, error } = useFetchImages();

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
        <InfoBlock />
      </Layout>
    </div>
  );
}
