import React, { useContext } from 'react'
import mycontext from '../Context/Createcontext'
import daily from './Daily png.png'
import dicon from './delete.png'
import eicon from  './edit.png'
import Alertcontext from '../Context/AlertContext'
function Showuserdata(props) {
  const {Checkalert}=useContext(Alertcontext)
  const {DeleteNote}=useContext(mycontext)
  const {note,UpdateNote}=props;
  const Delete=()=>{
const conform=window.confirm("Are you Sure you want to delete your data ?");
if(conform){
  DeleteNote(note._id);
  
  Checkalert('Your Work Note Successfully Deleted','Success')
}
   
  }
  return (
<> 
<div className='d-flex justify-content-between newcard my-1'>
<p className=" icon" onClick={Delete}><img className='daily' src={dicon} alt=''/></p>

<span className='mx-2'>{note.date}</span>
<span className='mx-2'>Price : {note.price}</span>
<span className='mx-2'>Work : {note.work}</span>
<span className='mx-2'><img src={daily} alt="" className='daily' />{note.dailywork}</span>

<p className=" icon"onClick={()=>{UpdateNote(note);}}><img className='daily' src={eicon} alt=''/></p>
</div>
    </>
  )
}

export default Showuserdata
