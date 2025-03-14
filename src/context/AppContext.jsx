import { getDoc, updateDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";


export const AppContext=createContext()

const AppContextProvider=(props)=>{

    const [userdata,setuserdata]=useState(null)
    const [chatdata,setchatdata]=useState(null)
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
    const value={
        userdata,
        setuserdata,
        chatdata,
        setchatdata,
        loaduserdata
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        
    </AppContext.Provider>
    )

}


export default AppContextProvider