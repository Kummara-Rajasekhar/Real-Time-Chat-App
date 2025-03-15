import React, { useContext, useEffect, useState } from 'react'
import './ChatBox.css'
import assets from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import upload from '../../lib/Upload'
const ChatBox = () => {

  const { userdata, messageid, chatuser, messages, setmessages } = useContext(AppContext)

  const [input, setinput] = useState("")


  useEffect(() => {

    if (messageid) {
      const unsub = onSnapshot(doc(db, 'messages', messageid), (res) => {
        setmessages(res.data().messages.reverse())
      })
      return () => {
        unsub()
      }
    }


  }, [messageid])


  const sendmessage = async () => {
    try {
      if (input && messageid) {
        await updateDoc(doc(db, 'messages', messageid), {
          messages: arrayUnion({
            sId: userdata.id,
            text: input,
            createdAt: new Date()
          })
        })
        const userids = [chatuser.rd, userdata.id]
        userids.forEach(async (id) => {
          const userchatRef = doc(db, 'chats', id);
          const userchatSnapShot = await getDoc(userchatRef);
          if (userchatSnapShot.exists()) {
            const userchatdata = userchatSnapShot.data()
            const charIndex = userchatdata.chatsdata.findIndex((c) => c.messageid === messageid);
            userchatdata.chatsdata[charIndex].lastMessage = input.slice(0, 30)
            userchatdata.chatsdata[charIndex].updatedAt = Date.now()
            if (userchatdata.chatsdata[charIndex].rid === userdata.id) {
              userchatdata.chatsdata[charIndex].messageseen = false
            }
            await updateDoc(userchatRef, {
              chatsdata: userchatdata.chatsdata
            })

          }
        })
      }

    }catch (error) {
      toast.error(error.message)
    }
    setinput("")
  }
  const convertTimeStamp=(time)=>{
    let date=time.toDate()
    const hour= date.getHours()
    const minute=date.getMinutes();
    if(hour>12){
      return hour-12 + ":" + " PM"
    }else{
      return hour+ ":" + minute + " AM"
    }
  }

  const sendimage=async(e)=>{
    try{

      const fileUrl=await upload(e.target.value)
      if(fileUrl && messageid){
        await updateDoc(doc(db, 'messages', messageid), {
          messages: arrayUnion({
            sId: userdata.id,
            image: fileUrl,
            createdAt: new Date()
          })
        })
        const userids = [chatuser.rd, userdata.id]
        userids.forEach(async (id) => {
          const userchatRef = doc(db, 'chats', id);
          const userchatSnapShot = await getDoc(userchatRef);
          if (userchatSnapShot.exists()) {
            const userchatdata = userchatSnapShot.data()
            const charIndex = userchatdata.chatsdata.findIndex((c) => c.messageid === messageid);
            userchatdata.chatsdata[charIndex].lastMessage = "Image"
            userchatdata.chatsdata[charIndex].updatedAt = Date.now()
            if (userchatdata.chatsdata[charIndex].rid === userdata.id) {
              userchatdata.chatsdata[charIndex].messageseen = false
            }
            await updateDoc(userchatRef, {
              chatsdata: userchatdata.chatsdata
            })

          }
        })
      }
    }catch(error){
      toast.error(error.message)
    }
  }
  return chatuser ? (
    <div className='chat-box'>
      <div className="chat-user">
        <img src={chatuser.userdata.avatar} alt="" />
        <p>{chatuser.userdata.name} {Date.now()-chatuser.userdata.lastseen<=70000 ? <img className='dot' src={assets.green_dot} alt="" /> : null}</p>
        <img src={assets.help_icon} className='help' alt="" />
      </div>

      <div className="chat-msg">
        {
          messages.map((messageid, i) => (
            <div className={msg.sid===userdata.id ?"s-msg":"r-msg"}>
              {
                msg['image']
                ? <img src={msg.image} className='msg-image'/>
                :
              <p className='msg'>{msg.text}</p>
              }
              <div>
                <img src={msg.sid===userdata.id ? userdata.avatar : chatuser.userdata.avatar} alt="" />
                <p>{convertTimeStamp(msg.createdAt)}</p>
              </div>
            </div>
          ))
        }
      </div>

      <div className="chat-input">
        <input onChange={(e) => setinput(e.target.value)} value={input} type="text" placeholder='Send a message' />
        <input onChange={sendimage} type="file" id='image' accept='image/png, image/jpeg' hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img onClick={sendmessage} src={assets.send_button} alt="" />
      </div>

    </div>
  )
    :
    <div className='chat-welcome'>
      <img src={assets.logo_icon} alt="" />
      <p>Chat anytitem, anywhere with anybody</p>
    </div>
}

export default ChatBox
