import React, { useState } from 'react'
import './Login.css'

import { signup,login ,resetPass} from '../../config/firebase';
import assets from '../../assets/assets'
const Login = () => {

  const [currstate,setcurrstate]=useState("Sign Up")
  const [username,setusername]=useState("")
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")


  const onsubmithandler=(e)=>{
    e.preventDefault();
    if(currstate==="Sign Up"){
      signup(username,email,password)
    }else{
      login(email,password)
    }


  }
  return (
    <div className='login'>
        <img src={assets.logo_big} alt="" className='logo' />
        <form onSubmit={onsubmithandler} action="" className='login-form'>
            <h2>{currstate}</h2>

            {currstate==="Sign Up" ?
            <input onChange={(e)=>setusername(e.target.value)} value={username} type="text" placeholder='username' className='form-input' required /> 
            : null
          }
            <input onChange={(e)=>setemail(e.target.value)} value={email} type="email" placeholder='emial' className='form-input'  required />
            <input onChange={(e)=>setpassword(e.target.value)} value={password} type="password" placeholder='passwird' className='form-input' required />
            <button type='submit'> {currstate==="Sign Up" ? "Create account" :"Login now "}</button>
            <div className='login-term'>
                <input type="checkbox" />
                <p>Agree to terms of user & privacy policy.</p>
            </div>
            <div className='login-forgot'>
              {currstate==="Sign Up" ?
                <p className='login-toggle'>Already have an account <span onClick={()=>setcurrstate("Login")}>Login here</span></p>
                :
                <p className='login-toggle'>Create an account <span onClick={()=>setcurrstate("Sign Up")}>Click here</span></p>
              }
              {
                currstate==="Login"?
                <p className='login-toggle'>Forgot Password ? <span onClick={()=>resetPass(email)}>Reset here</span></p>
                :null
              }

            </div>
        </form>
    </div>
  )
}

export default Login
