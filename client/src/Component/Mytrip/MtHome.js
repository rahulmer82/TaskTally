import React, { useContext, useEffect, useRef, useState } from 'react'
import mycontext from '../Context/Mtcontext'
import { useNavigate } from 'react-router-dom'
import Alertcontext from '../Context/AlertContext'
import TripNav from './TripNav'
import Showdata from './Showdata'
import Myinput from './MyInput'
import Alerts from '../Alert'
function MtHome() {
  const {Checkalert}=useContext(Alertcontext)
  const navigate=useNavigate()
  const[newdata,newSetdata]=useState({id:"",emember:"",emonney:"",edate:"",emessage:""})
  const {MtNote,GetMtNotes,MtEditNote,UserDelete}=useContext(mycontext)
   useEffect(()=>{
    if(localStorage.getItem('token')){ 
      GetMtNotes()
    }
    else{
      navigate('/login')
    }
   },[]);
   const ref=useRef(null)
   const refclose=useRef(null)

   // on cahnge function run to give date
    const Change=(e)=>{
      const update={...newdata,[e.target.name]:e.target.value}
newSetdata(update)
    }

    //update Note;
    const UpdateNote=(current)=>{
      newSetdata({emember:current.member, emonney:current.monney, edate:current.date, id:current._id,emessage:current.message})
      ref.current.click()
    }
    // submit data
    const hendlesubmit=()=>{
//logic of dailywork counter
 
      MtEditNote(newdata.id,newdata.emember,newdata.edate,newdata.emonney,newdata.emessage)
      refclose.current.click(); 
      Checkalert('Your Work Note Successfully Update','Success');
    }
    const Clear=()=>{
      const conform=window.confirm("Are you Sure you want to delete your data ?");
      if(conform){
        const mynuser=MtNote.map((note)=>{return note.user})
        UserDelete(mynuser[0])
        console.log(mynuser[0])
        
        Checkalert('Your Work Note Successfully Deleted','Success')
      }
    }

      
    
  return (
<>
<button type="button " ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade text-dark " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog newcard">
    <div className="modal-content modelcard">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update Your Data</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="mb-3">
  <label htmlFor="formGroupExampleInput" className="form-label" >Member</label>
  <input type="number" className="form-control" id="emember" name='emember' value={newdata.emember} onChange={Change} placeholder="Example input placeholder"/>
</div>
<div className="mb-3">
  <label htmlFor="formGroupExampleInput2" className="form-label">Monney</label>
  <input type="number" className="form-control" id="emonney" name='emonney' value={newdata.emonney}onChange={Change} placeholder="Another input placeholder"/>
</div>
<div className="mb-3">
  <label htmlFor="formGroupExampleIn" className="form-label" >Message</label>
  <input type="text" className="form-control" id="emessage" name='emessage' value={newdata.emessage} onChange={Change} placeholder="Another input placeholder"/>
</div>
<div className="mb-3">
  <label htmlFor="formGroupExampleIn" className="form-label" >Date</label>
  <input type="text" className="form-control" id="edate" name='edate' value={newdata.edate} onChange={Change} placeholder="Another input placeholder"/>
</div>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary"
         onClick={hendlesubmit}>Save changes</button>
      </div>
    </div>
  </div>
</div> 
{/* Modal.. */}
<TripNav note={MtNote} />
<Alerts/>
    <div  className='container'>
      <Myinput/>
     {MtNote.length >0 && <button className='btn btn-danger text-center' onClick={Clear}> Clear</button>}
      <div className='row my-4'>
        {MtNote.map((note)=>{
          return(
            <div key={note._id}> <Showdata note={note} UpdateNote={UpdateNote}/></div>
          )
        })}
      </div>
      
    </div>
    </>
  )
}

export default MtHome
