import React, {useState, useEffect} from "react";
import { useAuth } from "../context/AuthContext";
import {doc, setDoc, deleteField} from 'firebase/firestore'
import {db} from '../firebase'

export default function Settings() {
  const { userInfo, currentUser } = useAuth();
  return (
    <div>settings</div>
  )
}
