import React, { useEffect } from 'react';
import { getUser, updateProfile } from '../services/Apis';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Headers from '../components/Headers';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);

  const getUserById = async () => {
    try {
      const response = await getUser();
      console.log(response);
      if (response.status === 200) {
        setUser(response.data);
        formik.setValues({
          username: response.data.username || '',
          email: response.data.email || '',
          contact: response.data.contact || '',
        });
      }
      if (response.status === 401) {
        alert('Unauthorized user');
        navigate('/login');
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };

  useEffect(() => {
    !user && getUserById();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      contact: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      contact: Yup.string().required('Contact is required'),
    }),
    onSubmit: async (values) => {
      try {
        console.log(values);
        const response = await updateProfile(values);
        console.log(response);
        if (response.status === 200) {
          alert('User updated successfully');
        }
      } catch (error) {
        console.error('User update failed:', error);
      }
    },
  });

  return (
    <div>
      <Headers />
      <div className=' container-fluid'>

        <div className='row text-center'>
          <div className='col-10 mx-auto text-center text-title text-uppercase pt-5 mt-4 text-danger'>

            <h2 className='text-secondary mb-5'>Welcome to the Dashboard</h2>

            <form className='form-group w-50 mx-auto card p-4' onSubmit={formik.handleSubmit}>
              <h3 className='card-heading mb-4 '>Update Profile</h3>

              <input
                type='text'
                className='form-control '
                id='username'
                name='username'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                placeholder='Enter Name'
              />
              {formik.touched.username && formik.errors.username ? (
                <div className='text-danger'>{formik.errors.username}</div>
              ) : null}


              <input
                type='email'
                className='form-control mt-3 '
                id='email'
                name='email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder='Enter Email'
              />
              {formik.touched.email && formik.errors.email ? (
                <div className='text-danger'>{formik.errors.email}</div>
              ) : null}


              <input
                type='text'
                className='form-control mt-3'
                id='contact'
                name='contact'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contact}
                placeholder='Enter Contact'
              />
              {formik.touched.contact && formik.errors.contact ? (
                <div className='text-danger'>{formik.errors.contact}</div>
              ) : null}

              <button type='submit' className='btn btn-primary mt-4'>Submit</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
