import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Alertcontext from './Context/AlertContext';
import Navbar from './Navbar';
import Alerts from './Alert';
export default function Login() {
  const {Checkalert}=useContext(Alertcontext)
  //use Navigate hook to Navigate Home Page;
  const navigate=useNavigate()
// this Statte require to inuput data upadte
  const[user,setUser]=useState({email:"",password:""});
const Change=(e)=>{
  setUser({...user,[e.target.name]:e.target.value})
}
// this logic to Api Call on Backend And Got A reponce
  const hendlesubmit=async(e)=>{
    e.preventDefault();
    const responce= await fetch(`http://localhost:5000/api/auth/login`,{
      method:"POST",
      headers:{
        'Content-type':'Application/json'
      },
      body: JSON.stringify({email:user.email,password:user.password})
    })
    const json=await responce.json()
    if(json.success){
      localStorage.setItem('token',json.authtoken)
      navigate('/')
      Checkalert('You are Successfully Login Now','Success')
    }
    else{
      
      Checkalert("Invalid Login Details....Please Enter a Valid Login Details.!","Faill")
    }
  }
  return (
    <>
    <Navbar/>
    <Alerts/>
    <form className='my-4 myform container'onSubmit={hendlesubmit}>
      <h2 className='text-center'>Login</h2>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control myinput" id="email" aria-describedby="emailHelp" name='email' value={user.email} onChange={Change} required/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label ">Password</label>
      <input type="password" className="form-control myinput" id="exampleInputPassword1" name='password'value={user.password}onChange={Change} required/>
    </div>
    
    <button type="submit" className="btn btn-primary">Login</button>
  </form>
  </>
  )
}
