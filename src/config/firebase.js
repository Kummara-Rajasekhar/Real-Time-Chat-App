import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {collection, doc, getFirestore,query,setDoc} from 'firebase/firestore'
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyCiKoaRrWLkaQTwh45P-Yv7FuhFw-6DUPc",
  authDomain: "chat-app-f0ccb.firebaseapp.com",
  projectId: "chat-app-f0ccb",
  storageBucket: "chat-app-f0ccb.firebasestorage.app",
  messagingSenderId: "216552221852",
  appId: "1:216552221852:web:964dba4383124f19cb5159",
  measurementId: "G-D67XWL6P6S"
};
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const db=getFirestore(app)

const signup=async(username,email,password)=>{
    try{
        const res=await createUserWithEmailAndPassword(auth,email,password)
        const user=req.user;
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            usernmae:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hey, There i am using chat app",
            lastSeen:Date.now()
        })
        await setDoc(doc(db,"chats",user.uid),{
            chatsData:[]
        })

    }catch(error){
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}


const login=async(email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password)
    }catch(error){
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }

}

const logout=async()=>{
    try{
         await signOut(auth)
    }catch(error){
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const resetPass=async(email)=>{
    if(!email){
        toast.error("Enter your email")
        return null;
    }
    try{
        const userRef=collection(db,'users');
        if(!QuerySnapshot.empty){
            await sendPasswordResetEmail(auth,email)
            toast.success("Reset Email Sent")
        }else{
            toast.error("Email doesn't exists")
        }

    }catch(error){
        toast.error(error.message)
    }

}

export {signup,login,logout,auth,db,resetPass}