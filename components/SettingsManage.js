import React, {useState, useEffect} from "react";
import { useAuth } from "../context/AuthContext";
import {doc, setDoc, deleteField} from 'firebase/firestore'
import {db} from '../firebase'
import { useRouter } from "next/router";
import LoaderAnimation from './LoaderAnimation'
import useFetchPortfolioData from "../hooks/fetchPortfolioData";

// Header: icon, username, display name, occupation, contact email, resume
// Socials: Twitter, instagram, facebook, youtube, linkedin, custom
// Info: image, text (markup), layout


export default function SettingsManage(props) {
  const {currentUser} = useAuth()
  const {portfolioData, setPortfolioData, error} = props;
  const [newData, setNewData] = useState(null)

  const socialSites = ['twitter', 'instagram', 'facebook', 'youtube', 'linkedin']
  
  useEffect(() => {
    setNewData(portfolioData)
  }, [])

  if (!newData) {
    return <LoaderAnimation />
  } else return (
    <div className="w-full min-h-screen">
      <form className="settings-form flex flex-col p-10 [&_input]:px-2 [&_input]:h-10">
        <section className="py-6">
          <h2 className="text-xl pb-5">Display information:</h2>
          
          <label for="username">Username*</label>
          <input type='text' id='username' value={newData.username}></input>

          <label for="name">Display name*</label>
          <input type='text' id='name' value={newData.mainData.name}></input>
          
          <label for="iconURL">Icon URL</label>
          <input type='URL' id='iconURL' value={newData.mainData.icon}></input>

          <label for="title">Occupation or field</label>
          <input type='text' id='title' value={newData.mainData.title}></input>

          <label for="email">Contact email</label>
          <input type='email' id='email' value={newData.mainData.email}></input>

          <label for="resume">Link to resume file</label>
          <input type='URL' id='resume' value={newData.mainData.resume}></input>
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

export function getServerSideProps() {
  return
}