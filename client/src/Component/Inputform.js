import React, { useContext, useState } from 'react'
import mycontext from './Context/Createcontext'
import Alertcontext from './Context/AlertContext';
function Inputform() {
  const {AddNote}=useContext(mycontext)
  const {Checkalert}=useContext(Alertcontext)
  const [data,setData]=useState({price:"",work:""});
const Change=(e)=>{
  setData({...data,[e.target.name]:e.target.value});
}
const hendlesubmit=(e)=>{
  e.preventDefault()
  AddNote(data.price,data.work)
  setData({price:"",work:""});
  Checkalert('Your Work Note Successfully Added in Our Data..!','Success')
}

  return (
    <div className='myform container'>
      <div  className="mb-3 ">
  <label htmlFor="formGroupExampleInput"  className="form-label mylebal">Price</label>
  <input type="number"  className="form-control myinput" id="formGroupExampleInput"name='price' value={data.price} onChange={Change} placeholder="Enter a Single Pice Diomond Price"/>
</div>
<div  className="mb-3">
  <label htmlFor="formGroupExampleInput2"  className="form-label mylebal">Made Diomond</label>
  <input type="number"  className="form-control myinput" id="formGroupExampleInput2" name='work' value={data.work} onChange={Change} placeholder="Total Made Diomonds"/>
</div>
<button type="button " className="btn workbtn" disabled={data.price.length===0 || data.work.length===0} onClick={hendlesubmit}>ADD WORK</button>
    </div>
  )
}

export default Inputform
