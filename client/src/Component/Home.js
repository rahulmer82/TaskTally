import React, { useContext, useEffect, useRef, useState } from 'react'
import Inputform from './Inputform'
import Showuserdata from './Usedata/Showuserdata'
import mycontext from './Context/Createcontext'
import { useNavigate } from 'react-router-dom'
import Alertcontext from './Context/AlertContext'
import Navbar from './Navbar'
import Alerts from './Alert'
function Home() {
  const {Checkalert}=useContext(Alertcontext)
  const navigate=useNavigate()
  const[newdata,newSetdata]=useState({id:"",ework:"",eprice:"",edate:"",dailywork:""})
  const {Note,Getnotes,EditNote}=useContext(mycontext)
   useEffect(()=>{
    if(localStorage.getItem('token')){ 
      Getnotes()
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
      newSetdata({eprice:current.price, ework:current.work, edate:current.date, id:current._id,dailywork:current.dailywork})
      ref.current.click()
  
    }
    // submit data
    const hendlesubmit=()=>{
//logic of dailywork counter
  const dailywork=parseFloat(newdata.ework)*parseFloat(newdata.eprice)
      const formate =newdata.edate.split('/');
      const date=`${formate[0].padStart(2,'0')}/${formate[1].padStart(2,'0')}/${formate[2]}`

      EditNote(newdata.id,newdata.eprice,date,newdata.ework,dailywork)
      refclose.current.click(); 
      Checkalert('Your Work Note Successfully Update','Success');
    }

    // Seprate Data For Month Vises;
    const date=new Date()
    const month=date.getMonth()+1;
    const months=month.toString()
    const year=date.getFullYear();
    const Currentdate =`${year}-${months.padStart(2,'0')}`;

    function formate(stringdate){
        const [day,month,year]=stringdate.split('/')
        return `${year}-${month}`
    }
    
    const result= Note.filter((item) => {
        const itemDate = formate(item.date);
        return Currentdate===itemDate
        
      });
// Formate Starting Date to End Date
      function dayformate(stringdate) {
        const [day, month, year] = stringdate.split('/')
        return parseInt(day)
    }

    let render = result.sort((a, b) => {
      const adate = dayformate(a.date)
      const bdate = dayformate(b.date)

      return adate - bdate

  })
    
    
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
  <label htmlFor="formGroupExampleInput" className="form-label" >Price</label>
  <input type="number" className="form-control" id="eprice" name='eprice' value={newdata.eprice} onChange={Change} placeholder="Example input placeholder"/>
</div>
<div className="mb-3">
  <label htmlFor="formGroupExampleInput2" className="form-label">Work</label>
  <input type="number" className="form-control" id="ework" name='ework' value={newdata.ework}onChange={Change} placeholder="Another input placeholder"/>
</div>
<div className="mb-3">
  <label htmlFor="formGroupExampleIn" className="form-label" >Date</label>
  <input type="text" className="form-control" id="edate" name='edate' value={newdata.edate} onChange={Change} placeholder="Another input placeholder"/>
</div>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary"
        disabled={newdata.eprice.length===0 || newdata.ework.length===0 || newdata.edate.length===0} onClick={hendlesubmit}>Save changes</button>
      </div>
    </div>
  </div>
</div> 
{/* Modal.. */}
<Navbar result={result}/>
<Alerts/>
    <div  className='container'>
    <div  className='text-center my-2'>
        <h1><i>TASK TALLY</i></h1>
    <p><i>Add Your Daily Work . In This App And Store Your Work . And View Any Time Any Whare..!</i></p> </div>
      <Inputform/>
      <div className='row my-4'>
        {render.map((note)=>{
          return(
            <div key={note._id}> <Showuserdata note={note} UpdateNote={UpdateNote}/></div>
          )
        })}
      </div>
      
    </div>
    </>
  )
}

export default Home
