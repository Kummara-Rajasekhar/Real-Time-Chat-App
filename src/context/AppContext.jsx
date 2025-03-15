import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";


export const AppContext=createContext()

const AppContextProvider=(props)=>{

    const [userdata,setuserdata]=useState(null)
    const [chatdata,setchatdata]=useState(null)
    const [messages,setmessages]=useState([])
    const [messageid,setmessageid]=useState(null)
    const [chatuser,setchatuser]=useState(null)
    const [chatvisible,setchatvisible]=useState(false)
    const navigate=useNavigate()
    const loaduserdata=async(uid)=>{
        try{
            const userRef=doc(db,'users',uid);
            const userSnap=await getDoc(userRef)
            const userData=userSnap.data()
            setuserdata(userData)
            if(userData.avatar && userData.name){
                navigate('/chat')
            }else{
                navigate('/profile')
            }
            await updateDoc(userRef,{
                lastSeen:Data.now()
            })
            setInterval(async()=>{
                if(auth){
                    await updateDoc(userRef,{
                        lastSeen:Data.now()
                    })
                }
            })
        }catch(error){

        }

    }
    useEffect(()=>{
        if(userdata){
            const chatRef=doc(db,"users",userdata.id);
            const unsub=onSnapshot(chatRef,async(res)=>{
                const chatIems=res.data().chatsData;
                const tempData=[]
                for( const item of chatIems){
                    const userRef=doc(db,"users",item.rId);
                    const userSnap=await getDoc(userRef);
                    const userData=userSnap.data()
                    tempData.push({...item,userData})
                }
                setchatdata(tempData.sort((a,b)=>b.updatedAt-a.updatedAt))
            })
            return ()=>{
                unsub();
            }
        }
    },[userdata])

    const value={
        userdata,
        setuserdata,
        chatdata,
        setchatdata,
        loaduserdata,
        messageid,
        setmessageid,
        messages,
        setmessages,
        chatuser,
        setchatdata,
        chatvisible,
        setchatvisible,
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        
    </AppContext.Provider>
    )

}


export default AppContextProvider