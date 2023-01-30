import React, {useState, useEffect} from "react";
import { useAuth } from "../context/AuthContext";
import {doc, setDoc, deleteField} from 'firebase/firestore'
import {db} from '../firebase'
import { useRouter } from "next/router";
import SettingsManage from "../components/SettingsManage";
import Link from "next/link";
import Navbar from '../components/Navbar'
import useFetchPortfolioData from "../hooks/fetchPortfolioData";

export default function SettingsPage() {
  const { currentUser, theme } = useAuth();
  const router = useRouter()

  // Header: icon, username, display name, occupation, contact email, resume
  // Socials: Twitter, instagram, facebook, youtube, linkedin, custom
  // Info: image, text (markup), layout

  const {setPortfolioData, loading, error, portfolioData} = useFetchPortfolioData(currentUser.displayName)

  if (!currentUser) {
    router.push('/login')
    return
  }  

  return (
    <div className={`theme-${theme} bg-bgPrimary text-textPrimary`}>
      <Navbar />

      <div className="grid grid-cols-[200px_1fr] max-w-5xl m-auto divide-x-4">
        <ul className="flex flex-col gap-2 p-5 text-lg [&>*]:py-1">
          <li>
            <Link href="/">
              <i className="fa-solid fa-house"></i> Your page
            </Link>
          </li>
          <li>
            <i className="fa-solid fa-palette"></i> <button>Manage page</button>
          </li>
          <li>
            <i className="fa-solid fa-gear"></i> <button>Settings</button>
          </li>
        </ul>

        {
          !loading && <SettingsManage portfolioData={portfolioData} setPortfolioData={setPortfolioData} loading={loading}/>
        }
      </div>

    </div>

  )
}
