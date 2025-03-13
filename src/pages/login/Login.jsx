import React, { useState } from 'react'
import './Login.css'

import assets from '../../assets/assets'
const Login = () => {

  const [currstate,setcurrstate]=useState("Sign Up")

  return (
    <div className='login'>
        <img src={assets.logo_big} alt="" className='logo' />
        <form action="" className='login-form'>
            <h2>{currstate}</h2>

            {currstate==="Sign Up" ?
            <input type="text" placeholder='username' className='form-input' required /> 
            : null
          }
            <input type="email" placeholder='emial' className='form-input'  required />
            <input type="password" placeholder='passwird' className='form-input' required />
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

            </div>
        </form>
    </div>
  )
}

export default Login
