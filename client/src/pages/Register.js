import React from 'react'
import { registerfunction } from '../services/Apis';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify"

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    contact: '',
    password: '',
  });

  const validateForm = () => {
    const { username, email, contact, password } = formData;
    if (!username || !email || !contact || !password) {
      alert("All fields are required");
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Invalid email format");
      return false;
    }
    const contactPattern = /^\d{10}$/;
    if (!contactPattern.test(contact)) {
      alert("Invalid contact number");
      return false;
    }
    return true;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const resposne = await registerfunction(formData);
        console.log(resposne);
        if (resposne.status === 201) {
          alert("Registered successfully")
          navigate("/dashboard");
        } else
          toast.error(resposne.response.data.message);

      } catch (error) {
        console.error("Error during registration:", error);
        alert("An error occurred during registration.");
      }
    } else {
      alert("Form validation failed. Please check the form fields.");
    }
  };
  return (
    <div className='container'>
      <ToastContainer />
      <div className='row'>
        <div className='col-10 mx-auto text-center text-title'>
          <div className='col-10 mx-auto col-md-6 mt-5'>
            <form className='mt-5 p-5 card' onSubmit={handleSubmit}>
              <h1 className='mb-5'>Register</h1>
              <div className='form-group mb-3'>

                <input type='username' name="username" onChange={handleChange} className='form-control' id='username' placeholder='Enter username' />
              </div>
              <div className='form-group mb-3'>

                <input type='email' name="email" onChange={handleChange} className='form-control' id='email' placeholder='Enter Email' />
              </div>
              <div className='form-group mb-3'>

                <input type='contact' name="contact" onChange={handleChange} className='form-control' id='contact' placeholder='Enter Contact' />
              </div>
              <div className='form-group mb-3'>

                <input type='password' name="password" onChange={handleChange} className='form-control' id='password' placeholder='Password' />
              </div>
              <button type='submit' className='btn btn-primary mt-4'>Submit</button>

              <div className='mt-4'>Already have an account <Link className='text-decoration-none' to={"/login"}>Login</Link> </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register