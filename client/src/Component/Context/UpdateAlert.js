import { useState } from "react";
import Alertcontext from "./AlertContext";
const UpdateAlert=(props)=>{
    const [alert,setAlert]=useState(null)
   
const Checkalert=(message,type)=>{
    setAlert({
        msg:message,
        type:type
    });
    setTimeout(()=>{
        setAlert(null)
    },4000)
}
    return(
    <Alertcontext.Provider value={{alert,Checkalert}}>
        {props.children}
    </Alertcontext.Provider>
    )
}
export default UpdateAlert