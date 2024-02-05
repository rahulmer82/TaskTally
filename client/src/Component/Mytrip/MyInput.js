import React from 'react'
import { useState,useContext } from 'react';
import MtContext from '../Context/Mtcontext';
import Alertcontext from '../Context/AlertContext';

function MyInput() {
  const {Checkalert}=useContext(Alertcontext)
    const {MtAddNote}=useContext(MtContext)
    const [data,setData]=useState({member:"",monney:"",message:""});
  const Change=(e)=>{
    setData({...data,[e.target.name]:e.target.value});
  }
  const hendlesubmit=(e)=>{
    e.preventDefault()
    MtAddNote(data.member,data.monney,data.message)
    console.log(data.member,data.monney,data.message)
    setData({monney:"",message:""});
    Checkalert('Your Work Note Successfully Added in Our Data..!','Success')
  }
  
    return (
      <div className='myform container'>
        <h2 className='text-center'>Trip Cost</h2>
        <div  className="mb-3 ">
    <label htmlFor="formGroupExampleInput"  className="form-label mylebal">Member</label>
    <input type="number"  className="form-control myinput" id="formGroupExampleInput"name='member' value={data.member} onChange={Change} placeholder="Please Enter A Group Member"/>
  </div>
  <div  className="mb-3">
    <label htmlFor="formGroupExampleInput2"  className="form-label mylebal">Spend Monney</label>
    <input type="number"  className="form-control myinput" id="formGroupExampleInput2" name='monney' value={data.monney} onChange={Change} placeholder="How Much Monney Use ..?"/>
  </div>
  <div  className="mb-3">
    <label htmlFor="formGroupExampleInput2"  className="form-label mylebal">Message</label>
    <input type="text"  className="form-control myinput" id="formGroupExampleInput2" name='message' value={data.message} onChange={Change} placeholder="Where Use Monney Please Describe "/>
  </div>
  <button type="button " className="btn workbtn" disabled={data.monney.length===0 || data.message.length===0} onClick={hendlesubmit}>ADD EXPENSE</button>
      </div>
    )
    }

export default MyInput
