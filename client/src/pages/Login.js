import React from 'react'
import { useState } from 'react';
import { loginFunction } from '../services/Apis';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginFunction({ email, password });
      console.log(response);
      if (response.status === 200) {
        alert("Logged in successfully")
        navigate('/dashboard');
      }
      toast.error(response.response.data.message);
    } catch (error) {
      console.error('Login failed:', error);

    }
  };
  return (

    <div className='container'>
      <ToastContainer />
      <div className='row'>
        <div className='col-10 mx-auto text-center text-title'>

          <div className='col-10 mx-auto col-md-6 mt-5'>
            <form className='mt-5 p-5 card' onSubmit={handleLogin} >
              <h1 className='mb-5'>login</h1>
              <div className='form-group mb-3'>

                <input type='email' className='form-control' onChange={(e) => setEmail(e.target.value)} id='email' placeholder='Enter Email' />
              </div>
              <div className='form-group mb-3'>

                <input type='password' className='form-control' onChange={(e) => setPassword(e.target.value)} id='password' placeholder='Password' />
              </div>
              <button type='submit' className='btn btn-primary mt-4'>Submit</button>
              <div className='mt-4'>Don't have an account <Link className='text-decoration-none' to={"/register"}>Register</Link> </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login