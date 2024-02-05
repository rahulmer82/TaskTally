import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Alertcontext from './Context/AlertContext';
import Navbar from './Navbar';
import Alerts from './Alert';
export default function Sinup() {
const {Checkalert}=useContext(Alertcontext)
  // Navigate hook use to redirect to Home page;
  const Navigate=useNavigate()
  const[user,setUser]=useState({name:"",email:"",password:""});
  const Change=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }
  // logic to submit data and call the api;
  const hendlesubmit=async(e)=>{
    e.preventDefault()
const responce=await fetch(`http://localhost:5000/api/auth/createuser`,{
  method:'POST',
  headers:{
    'Content-type':"Application/json"
  },
  body: JSON.stringify({name:user.name,email:user.email,password:user.password})
});
const json=await responce.json()
if(json.success){
  localStorage.setItem('token',json.authtoken)
  Navigate('/')
  Checkalert("Welome to TaskTally ..Store Your daily Data..😊")
}
else{
  Checkalert("Invalid details Enter..!",'Faill')
  
}
  }
  return (
    <>
<Navbar/>
<Alerts/>
    <form className='container  my-4 myform' onSubmit={hendlesubmit}>
       <h2 className='text-center'>Sign up </h2>
      <div className="mb-3">
      <label htmlFor="name" className="form-label">Your Full Name</label>
      <input type="text" className="form-control myinput" id="username" name='name' value={user.name} onChange={Change} min={3} required/>
      </div>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control myinput" id="exampleInputEmail1"  aria-describedby="emailHelp" name='email' onChange={Change} value={user.email} required/>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control myinput" id="exampleInputPassword1" min={5} name='password' value={user.password} onChange={Change} required/>
    </div>
    
    <button type="submit" className="btn btn-primary">Sign up</button>
  </form>
  </>
  )
}
