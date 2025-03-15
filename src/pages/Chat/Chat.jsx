import React, { useContext, useEffect, useState } from 'react'
import './Chat.css'

import LeftSider from '../../components/LeftSider/LiftSider'
import ChatBox from '../../components/ChatBoc/ChatBox'
import RightSider from '../../components/RightSider/RightSider'
import { AppContext } from '../../context/AppContext'
const Chat = () => {

  const {chatdata,userdata}=useContext(AppContext)
  const [loading,setloading]=useState(true)

  useEffect(()=>{
    if(chatdata && userdata){
      setloading(false)
    }
  },[chatdata,userdata])
  return (
    <div className='chat'>
      {
        loading 
        ? <p className='loading'>Loading...</p>
        :
        <div className='chat'>
      <div className="chat-container">
        <LeftSider/>
        <ChatBox/>
        <RightSider/>
      </div>
    </div>
    }
    </div>
  )
}

export default Chat
