import React, { useContext } from 'react'
import mycontext from '../Context/Mtcontext'
import daily from '../Usedata/Daily png.png'
import dicon from '../Usedata/delete.png'
import eicon from  '../Usedata/edit.png'
import Alertcontext from '../Context/AlertContext'
function Showdata(props) {
  const {Checkalert}=useContext(Alertcontext)
  const {MtDeleteNote}=useContext(mycontext)
  const {note,UpdateNote}=props;
  const Delete=()=>{
const conform=window.confirm("Are you Sure you want to delete your data ?");
if(conform){
  MtDeleteNote(note._id);
  
  Checkalert('Your Work Note Successfully Deleted','Success')
}
   
  }
  return (
<> 
<div className='d-flex justify-content-between newcard my-1'>
<p className=" icon" onClick={Delete}><img className='daily' src={dicon} alt=''/></p>
<span>{note.date}</span>
<span>Member : {note.member}</span>
<span> {note.message}</span>
<span><img src={daily} alt="" className='daily' />{note.monney}</span>
<p className=" icon"onClick={()=>{UpdateNote(note);}}><img className='daily' src={eicon} alt=''/></p>
</div>
    </>
  )
}

export default Showdata