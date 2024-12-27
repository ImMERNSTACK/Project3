import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();
    return (
        <div className="container">
            <div className='row'>
                <div className='col-md-12'>
                    <div className='jumbotron mt-5 text-center bg-light'>
                        <h1 className='display-4'>Welcome to the MERN Stack</h1>
                        <p className='lead'>This is a simple application that demonstrates an Authentication System.</p>
                        <hr className='my-4' />
                        <p>Click the Login button to Log in, or Register to create an account.</p>
                        <a onClick={() => navigate("/login")} className='btn btn-primary btn-lg ' href='/login' role='button'>Login</a>&nbsp;
                        <a onClick={() => navigate("/register")} className='btn btn-primary btn-lg' href='/register' role='button'>Register</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home