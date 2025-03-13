import React from 'react'
import './Chat.css'

import LeftSider from '../../components/LeftSider/LiftSider'
import ChatBox from '../../components/ChatBoc/ChatBox'
import RightSider from '../../components/RightSider/RightSider'
const Chat = () => {
  return (
    <div className='chat'>
      <div className="chat-container">
        <LeftSider/>
        <ChatBox/>
        <RightSider/>
      </div>
    </div>
  )
}

export default Chat
