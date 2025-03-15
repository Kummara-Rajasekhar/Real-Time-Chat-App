import React, { useContext, useEffect, useState } from 'react'
import './Right.css'
import assets from '../../assets/assets'
import { logout } from '../../config/firebase'
import { AppContext } from '../../context/AppContext'
const RightSider = () => {

  const { chatuser, messages } = useContext(AppContext)

  const [msgimages,setmsgimages]=useState([])

  useEffect(()=>{
    let temp=[]
    messages.map((msg)=>{
      if(msg.image){
        temp.push(msg.imagez)
      }
    })
    setmsgimages(temp)
  },[messages])
  return chatuser ? (
    <div className='rs'>
      <div className="rs-profile">
        <img src={chatuser.userdata.avatar} alt="" />
        <h3> {Date.now()-chatuser.userdata.lastseen<=70000 ? <img src={assets.green_dot} className='dot' alt="" /> : null}{chatuser.userdata.name}</h3>
        <p>{chatuser.userdata.bio}</p>
      </div>

      <div className="rs-media">
        <p>Media</p>
        <div>
          {
            msgimages.map((item,i)=>(
              <img onClick={()=>window.open(item)} src={item} key={i}/>
            ))
          }
        </div>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  )
    :
    (

      <div className='rs'>
        <button onClick={()=>logout()}>Logout</button>

      </div>
    )
}

export default RightSider
