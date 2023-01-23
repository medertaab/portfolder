import React, {useState, useEffect} from "react";
import { useAuth } from "../context/AuthContext";
import {doc, setDoc, deleteField} from 'firebase/firestore'
import {db} from '../firebase'
import { useRouter } from "next/router";
import SettingsManage from "../components/SettingsManage";
import Link from "next/link";
import Navbar from '../components/Navbar'

export default function SettingsPage() {
  const { currentUser } = useAuth();
  const router = useRouter()

  // Header: icon, username, display name, occupation, contact email, resume
  // Socials: Twitter, instagram, facebook, youtube, linkedin, custom
  // Info: image, text (markup), layout


  if (!currentUser) {
    router.push('/login')
    return
  }  

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-[200px_1fr] max-w-5xl border-2 border-black">
      <ul className="">
        <li><Link href="/">Your page</Link></li>
        <li><button>Manage page</button></li>
        <li><button>Settings</button></li>
      </ul>
      <SettingsManage />
    </div>
    </div>

  )
}
