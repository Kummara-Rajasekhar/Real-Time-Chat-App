import React, { useContext, useEffect, useState } from 'react'
import './ProfileUpdate.css'
import assets from '../../assets/assets'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import upload from '../../lib/Upload'
import { AppContext } from '../../context/AppContext'
const ProfileUpdate = () => {

  const [image,setimage]=useState(false)
  const [name,setname]=useState("")
  const [bio,setbio]=useState("")
  const [uid,setuid]=useState("")
  const [preimage,serpreimage]=useState("")
  const {setuserdata}=useContext(AppContext)
  const navigate=useNavigate()


  const prefileupdate=async(e)=>{
    e.preventDefault()
    try{
      if(!preimage && !image){
        toast.error("Upload Profile Picture")
      }
      const docRef=doc(db,"users",uid)
      if(image){
        const imgUrl=await upload(image);
        serpreimage(imgUrl)
        await updateDoc(docRef,{
          avatar:imgUrl,
          bio:bio,
          name:name
        })
      }else{
        await updateDoc(docRef,{
          bio:bio,
          name:name
        })
      }
      const snap=await getDoc(docRef)
      setuserdata(snap.data())
      navigate('/chat')
    }catch(error){
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    onAuthStateChanged(auth,async(user)=>{
      if(user){
        setuid(user.uid)
        const docRef=doc(db,"users",user.uid);
        const docSnap= await getDoc(docRef)
        if(docSnap.data().name){
          setname(docSnap.data().name);
        }
        if(docSnap.data().bio){
          setbio(docSnap.data().bio);
        }
        if(docSnap.data().avatar){
          serpreimage(docSnap.data().avatar);
        }
      }else{
        navigate('/')
      }
    })
  },[])
  return (
    <div className='profile'>
      <div className='profile-container'>
        <form onSubmit={prefileupdate} action="" >
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input onChange={(e)=> setimage(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden />
            <img src={image ? URL.createObjectURL(image): assets.avatar_icon } alt="" />
            upload profile image
          </label>
          <input onChange={(e)=>setname(e.target.value)} value={name} type="text" placeholder='Your name' required />
          <textarea onChange={(e)=> setbio(e.target.value)} value={bio} name="" id="" placeholder='Write profile bio' readOnly></textarea>
          <button type='submit'>Save</button>

        </form>
        <img className='profile-pic' src={image ? URL.createObjectURL(image) : preimage ? preimage:  assets.logo_icon} alt="" />

      </div>
      
    </div>
  )
}

export default ProfileUpdate
