import React, { useContext, useEffect, useState } from 'react'
import mycontext from './Context/Createcontext';
import daily from './Usedata/Daily png.png';
import dicon from './Usedata/delete.png';
import Alertcontext from './Context/AlertContext';
import Navbar from './Navbar';
import Alerts from './Alert';
function Selectdata() {
  const {Note, Getnotes,DeleteNote}=useContext(mycontext)
  const {Checkalert}=useContext(Alertcontext)
 const[start,SetStart]=useState("2023/02/20");
 const[End,SetEnd]=useState("2023/03/20");

  //Call Use Effect Hook To refresh The Data
  useEffect(()=>{
    Getnotes()
  },[])
  // Found Input Value
const StartChange=(e)=>{SetStart(e.target.value)};
const EndChange=(e)=>{SetEnd(e.target.value)}
const startDate=start.toString()
const EndDate=End.toString()
// formating Date Function
function formateDate(dateString){
  const [day,month,year]=dateString.split('/');
  return `${year}-${month}-${day}`;
}

// Note Filter By Dates
const filteredResults = Note.filter((item) => {
  const itemDate = formateDate(item.date);
  return itemDate >= startDate && itemDate <= EndDate;
});
console.log(filteredResults);


//Delete Note Functions
const Delete=()=>{
  const conform=window.confirm("Are you Sure you want to delete your data ?");
  if(conform){
    const id=filteredResults.map((note)=>{return note._id})
    DeleteNote(id[0]);
   
    
    Checkalert('Your Work Note Successfully Deleted','Success')
  }
}

  
  return (
    <>
    <Navbar result={filteredResults}/>
    <Alerts/>
    <div className='container'>
      <div className='d-flex inputbox'>
      <div className='container'>
     <label htmlFor="" className='Selectlable' >Start Date</label>
     <input className='mx-2 myinput Rinput'  type="date" name='start' value={start} onChange={StartChange} />
     </div>
     <div className='container'>
      <label htmlFor="" className='Selectlable'>End Date</label>
      <input className='mx-2 myinput Rinput' type="date" name='end' value={End}  onChange={EndChange}/>
     </div>
     </div>
     <span><h1 className='my-3 text-center showdata'>Show Your Data</h1></span>
     <hr />
    {filteredResults.length===0 &&<p className='text-center showdata  nodata'>Data Not Found..!</p>}
     <div>
     {filteredResults.map((note)=>{
      return(
<div className='d-flex justify-content-between newcard my-1'>
<p className=" icon" onClick={Delete}><img className='daily' src={dicon} alt=''/></p>
<span>{note.date}</span>
<span>Price : {note.price}</span>
<span>Work : {note.work}</span>
<span><img src={daily} alt="" className='daily' />{note.dailywork}</span>
</div>
      )
     })  }
     </div>
    </div>
    </>
  )
}

export default Selectdata
