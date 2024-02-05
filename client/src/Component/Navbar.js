import React from 'react'
import diomond from './diomond.png'
import { Link, useNavigate } from 'react-router-dom'
import total from './total.png'
function Navbar(props) {
  const navigate=useNavigate()
  
    // show total Monthly Income

  
  
const hendleLogout=()=>{
  const logout=window.confirm("Do You Want to Logout..?")
  if(logout){
    localStorage.removeItem('token');
    navigate("/login")
  
  }

}
  return (
    <nav className="navbar mynav ">
  <div className="container-fluid">
    <Link className="navbar-brand d-flex logo" to="/">
      <img src={diomond} alt="Logo"  width="50" height="50"className="d-inline-block align-text-top mx-2 logo"/>
      <i className='heding'><h1>TaskTally</h1></i>
    </Link>
    {localStorage.getItem('token')?<div className='d-flex monneybox '>
      <img src={total} width='60' height={60} alt="" />
      <h3 className='mt-2 monney '>{props.result.reduce((sum, currentItem) => sum + currentItem.dailywork, 0)} </h3>
    </div>: " "}
  {!localStorage.getItem('token')?
  <form className="d-flex navb">
      <Link to='/login' className="btn btn-outline-success mx-1 navbtn" type="submit">Login</Link>
      <Link to='/sinup' className="btn btn-outline-success mx-1 navbtn" type="submit">Sinup</Link>
    </form>: 
<div class="dropdown">
  <button class="dropbtn mx-2" ><i class="fa-solid fa-bars bar"></i></button>
  <div class="dropdown-content">
    <Link to="/"><i class="fa-solid fa-house mx-3"></i>Home</Link>
    <Link to="/mydata"><i class="fa-solid fa-calendar-days mx-3"></i>Report</Link>
    <Link to="/login" onClick={hendleLogout}><i class="fa-solid fa-power-off mx-3"></i>Logout</Link>
  </div>
</div>}
      </div>
</nav>
  )
}

export default Navbar
