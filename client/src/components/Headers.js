import React from 'react'
import { logout } from '../services/Apis';
import { useNavigate } from 'react-router-dom';

function Headers() {
  const navigate=useNavigate();

    const handleLogout = async() => {
       const respose=await logout()
       if(respose.status===200){
         navigate('/login');
       }
    }
  return (
    <div><nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
          <input class="form-control me-5" type="search" placeholder="Search" aria-label="Search"/>
          <button class="btn btn-outline-success me-2" onClick={()=>navigate("/login")} >Login</button>
          <button class="btn btn-outline-danger" onClick={handleLogout} >Logout</button>
        
      </div>
    </div>
  </nav></div>
  )
}

export default Headers