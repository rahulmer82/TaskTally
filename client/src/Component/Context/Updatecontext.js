import { useState } from "react";
import mycontext from "./Createcontext";

const Newdata=(props)=>{
    const mydata=[]
    // main state this to update Clint data;
    const [Note,setNote]=useState(mydata)
    //fetch data
    const Getnotes= async()=>{
        let data= await fetch(`http://localhost:5000/api/data/mydata`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'usertoken':localStorage.getItem('token')
            }
        });
        const json=await data.json()
        setNote(json)
    };

    // Add Data to help This Api

    const AddNote=async(price,work)=>{
const responce=await fetch(`http://localhost:5000/api/data/addwork`,{
    method:'POST',
    headers:{
        'Content-type':'Application/json',
        'usertoken':localStorage.getItem('token')
    },
    body: JSON.stringify({price,work})
});
const json= await responce.json()
setNote(Note.concat(json))
    };

    // edit note using api calls;

    const EditNote=async (id,price,date,work,dailywork)=>{
const responce=await fetch(`http://localhost:5000/api/data/update/${id}`,{
    method:'PUT',
    headers:{
        'Content-type':'Application/json',
        'usertoken': localStorage.getItem('token')
    },
    body: JSON.stringify({price,work,date})
});
const json=await responce.json()
console.log(json)
let newNotes = JSON.parse(JSON.stringify(Note))
// Logic to edit in client
for (let index = 0; index < newNotes.length; index++) {
  const element = newNotes[index];
  if (element._id === id) {
    newNotes[index].price = price;
    newNotes[index].work =work;
    newNotes[index].date= date; 
    newNotes[index].dailywork=dailywork
    break; 
  }
} 
setNote(newNotes)
    }
    

  // Delete Notes using API calls;
  const DeleteNote=async(id)=>{
const response=await fetch(`http://localhost:5000/api/data/delete/${id}`,{
    method:'DELETE',
    headers:{
        'Content-type':'Application/json',
        'usertoken':localStorage.getItem('token')
    }
})
const json=await response.json();
const Newnote= Note.filter((note)=>{return note._id !==id})
setNote(Newnote)
  }  
return (
<mycontext.Provider value={{Note,Getnotes,DeleteNote,AddNote,EditNote}} >
    {props.children}
</mycontext.Provider>
);
}

export default Newdata;