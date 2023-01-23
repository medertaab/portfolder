import React, {useState, useEffect} from "react";
import { useAuth } from "../context/AuthContext";
import {doc, setDoc, deleteField} from 'firebase/firestore'
import {db} from '../firebase'
import { useRouter } from "next/router";

import useFetchPortfolioData from "../hooks/fetchPortfolioData";



export default function SettingsManage() {
  const {currentUser} = useAuth()
  const {portfolioData, setPortfolioData, loading, error} = useFetchPortfolioData(currentUser.displayName);
  const socialSites = ['twitter', 'instagram', 'facebook', 'youtube', 'linkedin']
  
  // Header: icon, username, display name, occupation, contact email, resume
  // Socials: Twitter, instagram, facebook, youtube, linkedin, custom
  // Info: image, text (markup), layout

  return (
    <div className="">
      <form className="settings-form border-2 border-red-500 flex flex-col p-10">
        <section className="py-6">
          <h2 className="text-xl pb-5">Display information:</h2>
          
          <label for="username">Username*</label>
          <input type='text' id='username'></input>

          <label for="name">Display name*</label>
          <input type='text' id='name'></input>
          
          <label for="iconURL">Icon URL</label>
          <input type='URL' id='iconURL'></input>

          <label for="title">Occupation or field</label>
          <input type='text' id='title'></input>

          <label for="email">Contact email</label>
          <input type='email' id='email'></input>

          <label for="resume">Link to resume file</label>
          <input type='URL' id='resume'></input>
        </section>
        <section>
          <h2 className="text-xl py-5">Social links</h2>

          {socialSites.map((site) => {
            return <>
              <label for={site}>{site} handle</label>
              <input type='text' id={site}></input>
            </>
          })}

          <label for="custom1">Custom link</label>
          <input type='text' id="custom1"></input>

          <label for="custom2">Custom link</label>
          <input type='text' id="custom2"></input>

          <label for="custom3">Custom link</label>
          <input type='text' id="custom3"></input>
        </section>

        <section>
          <h2 className="text-xl py-5">Description section</h2>

          <label for="infoImage">Custom image URL</label>
          <input type='URL' id='infoImage'></input>

          <label for="description">About you</label>
          <input type='textarea' id="description"></input>
        </section>
      </form>
    </div>
  )
}
