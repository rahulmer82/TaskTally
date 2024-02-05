import React from 'react'
import MtContext from './Mtcontext'
import { useState } from 'react'
function MtUpdate(props) {
    const mydata=[]
    const host=`https://tasktally-server.onrender.com/`
    // main state this to update Clint data;
    const [MtNote,setMtNote]=useState(mydata)
    //fetch data
    const GetMtNotes= async()=>{
        let data= await fetch(`${host}api/mt/mytrip`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'usertoken':localStorage.getItem('token')
            }
        });
        const json=await data.json()
        setMtNote(json)
    };

    // Add Data to help This Api

    const MtAddNote=async(member,monney,message)=>{
const responce=await fetch(`${host}api/mt/addinfo`,{
    method:'POST',
    headers:{
        'Content-type':'Application/json',
        'usertoken':localStorage.getItem('token')
    },
    body: JSON.stringify({member,monney,message})
});
const json= await responce.json()
setMtNote(MtNote.concat(json))
    };

    // edit note using api calls;

    const MtEditNote=async (id,member,date,monney,message)=>{
const responce=await fetch(`${host}api/mt/mtupdate/${id}`,{
    method:'PUT',
    headers:{
        'Content-type':'Application/json',
        'usertoken': localStorage.getItem('token')
    },
    body: JSON.stringify({member,monney,message,date})
});
const json=await responce.json()
console.log(json)
let newNotes = JSON.parse(JSON.stringify(MtNote))
// Logic to edit in client
for (let index = 0; index < newNotes.length; index++) {
  const element = newNotes[index];
  if (element._id === id) {
    newNotes[index].member = member;
    newNotes[index].data =date;
    newNotes[index].monney= monney; 
    newNotes[index].message=message
    break; 
  }
} 
setMtNote(newNotes)
    }
    

  // Delete Notes using API calls;
  const MtDeleteNote=async(id)=>{
const response=await fetch(`${host}api/mt/mtdelete/${id}`,{
    method:'DELETE',
    headers:{
        'Content-type':'Application/json',
        'usertoken':localStorage.getItem('token')
    }
})
const json=await response.json();
const Newnote=MtNote.filter((note)=>{return note._id !==id})
setMtNote(Newnote)
  }
  
  const UserDelete= async (id)=>{
    const responce= await fetch(`${host}api/mt/mtuserdelete/${id}`,{
      method:'DELETE',
      headers:{
        'Content-type':'Application/json',
        'usertoken':localStorage.getItem('token')
      }
    })
    const json=await responce.json();
    const Newnote=MtNote.filter((note)=>{return note.user !==id})
    setMtNote(Newnote)
  }
  return (
    <div>
      <MtContext.Provider value={{MtNote,GetMtNotes,MtDeleteNote,MtAddNote,MtEditNote,UserDelete}}>
        {props.children}
      </MtContext.Provider>
    </div>
  )
}

export default MtUpdate
