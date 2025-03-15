import React, { useContext, useState } from 'react'
import './LeftSider.css'
import assets from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { arrayUnion, collection, doc, getDoc, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
const LiftSider = () => {

    const navigate = useNavigate()
    const { userdata ,chatuser,setchatuser,setmessageid,messageid} = useContext(AppContext)
    const [user, setuser] = useState(null)
    const [showsearch, setshowsearch] = useState(false)


    const inputhandler = async (e) => {
        try {
            const input = e.target.value
            if (input) {
                setshowsearch(true)
                const userRef = collection(db, 'users')
                const q = query(userRef, where("username", "==", input.toLowerCase()));
                const querySnap = await getDoc(q);
                if (!querySnap.empty && querySnap.docs[0].data() !== userdata.id) {
                    let userExist=false
                    chatsData.map((user)=>{
                        if(user.rid===querySnap.docs[0].data().id){
                            userExist=true
                        }
                    })
                    if(!userExist){
                        setuser(querySnap.docs[0].data())
                    }
                    setuser(querySnap.docs[0].data())
                }
                else {
                    setshowsearch(false)
                }
            } else {
                setuser(null)
            }
        } catch (error) {

        }
    }

    const addchat=async()=>{
        const messagesRef=collection(db,"messages")
        const chatsRef=collection(db,"chats")
        try{
            const newMessageRef=doc(messagesRef);
            await setDoc(newMessageRef,{
                createdAt:serverTimestamp(),
                messages:[]
            })

            await updateDoc(doc(chatsRef,user.id),{
                chatsData:arrayUnion({
                    messageId:newMessageRef.id,
                    lastMessage:"",
                    rId:userdata.id,
                    updatedAt:Date.now(),
                    messageSeen:true

                })
            })
            await updateDoc(doc(chatsRef,user.id),{
                chatsData:arrayUnion({
                    messageId:newMessageRef.id,
                    lastMessage:"",
                    rId:user.id,
                    updatedAt:Date.now(),
                    messageSeen:true

                })
            })
        }catch(error){

        }
    }

    const setchat =async(item)=>{
        try{

            setmessageid(item.messageid)
            setchatuser(item)
            const userchatRef=doc(db,'chats',userdata.id)
            const userchatSnapShot=await getDoc(userchatRef)
            const userchatdata=userchatSnapShot.data()
            const chatIndex=userchatdata.chatsData.findIndex((c)=>c.messageId===item.messageId)
            userchatdata.chatsData[chatIndex].messageSeen=true
            await updateDoc(userchatRef,{
                chatsData:userchatdata.chatsData
            })
        }catch(error){
            toast.error(error.message)
        }


    }
    return (
        <div className='ls'>
            <div className='ls-top'>
                <div className="ls-nav">
                    <img src={assets.logo} className='logo' alt="" />
                    <div className="menu">
                        <img src={assets.menu_icon} alt="" />
                        <div className="sub-menu">
                            <p onClick={() => navigate('/profile')}>Edit Profile</p>
                            <hr />
                            <p>Logout</p>
                        </div>
                    </div>
                </div>
                <div className="ls-search">
                    <img src={assets.search_icon} alt="" />
                    <input onChange={inputhandler} type="text" placeholder='Serach here...' />
                </div>

            </div>

            <div className="ls-list">
                {
                    showsearch && user
                        ?
                        <div onClick={addchat} className='friends add-user'>
                            <img src={user.avatar} alt="" />
                            <p>{user.name}</p>
                        </div>
                        :
                        chatsData.map((item, i) => (
                            <div onClick={setchat(item)} key={i} className={`friends ${item.messageSeen  || item.messageid ? "" : "border"}`}>
                                <img src={item.userdata.avatar} alt="" />
                                <div>
                                    <p>{item.userdata.name}</p>
                                    <span>{item.userdata.bio}</span>
                                </div>
                            </div>
                        ))

                }
            </div>

        </div>
    )
}

export default LiftSider
