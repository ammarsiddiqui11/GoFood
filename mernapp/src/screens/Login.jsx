import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/loginuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert('Enter valid credentials');
      }
      if (json.success) {
        localStorage.setItem('userEmail', credentials.email);
        localStorage.setItem('authToken', json.authToken);
        console.log(localStorage.getItem('authToken'));
        navigate('/');
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
    <div>
    {/* <h1 className='text-success  fs-1 fst-italic '>GoFood</h1> */}
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='card shadow-lg p-4' style={{ width: '400px' }}>
        <h2 className='text-center mb-4'>Login</h2>
        <form onSubmit={handleSubmit}>
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

          <button type='submit' className='btn btn-success w-100 mb-3'>
            Submit
          </button>

          <p className='text-center'>
            New here?{' '}
            <Link to='/createuser' className='text-decoration-none'>
              <span className='text-danger'>Create an account</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
    </div>
  );
}
