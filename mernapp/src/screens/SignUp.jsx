import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', geolocation: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation, // Corrected typo
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      console.log(json);
      navigate('/');

      if (!json.success) {
        alert('Enter valid credentials');
      }
    } catch (error) {
      console.error('Failed to fetch:', error);
      alert('Failed to fetch data from the server');
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='card shadow-lg p-4' style={{ width: '400px' }}>
        <h2 className='text-center mb-4'>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='user' className='form-label'>
              Username
            </label>
            <input
              type='text'
              className='form-control'
              name='name'
              value={credentials.name}
              onChange={onChange}
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='exampleInputEmail1' className='form-label'>
              Email Address
            </label>
            <input
              type='email'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              name='email'
              value={credentials.email}
              onChange={onChange}
              required
            />
            <div id='emailHelp' className='form-text'>
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className='mb-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='exampleInputPassword1'
              name='password'
              value={credentials.password}
              onChange={onChange}
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='exampleInputlocation' className='form-label'>
              Location
            </label>
            <input
              type='text'
              className='form-control'
              name='geolocation'
              value={credentials.geolocation}
              onChange={onChange}
              required
            />
          </div>

          <button type='submit' className='btn btn-success w-100 mb-3'>
            Submit
          </button>

          <p className='text-center'>
            Already a user?{' '}
            <Link to='/login' className='text-decoration-none'>
              <span className='text-danger'>Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
