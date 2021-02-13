import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({ signupUser, error, loading }) => {
  const [user, setUser] = useState({ name: '', password: '' });
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.name === '') {
      setErrors((errors) => [...errors, 'name']);
    }
    if (user.password === '') {
      setErrors((errors) => [...errors, 'password']);
    }

    if (user.name && user.password) {
      signupUser({
        variables: {
          signupUserData: {
            name: user.name,
            password: user.password,
          },
        },
      });
      setUser({ name: '', password: '' });
    }
  };

  return (
    <div className='auth-background'>
      <div className='auth-form'>
        <div className='header'>
          <h2>Create an account</h2>
          <p className='disclaimer'>
            Disclaimer: This is not mobile friendly, please consider switching
            to desktop for better experience
          </p>
        </div>
        <div>
          <form id='login' onSubmit={handleSubmit}>
            <div
              className={`input-wrapper ${
                errors.includes('name') || error ? 'error' : ''
              }`}
            >
              <label htmlFor='username'>
                USERNAME{' '}
                {errors.includes('name') && (
                  <span> - Username is required</span>
                )}
                {error && error.message && <span> - {error.message}</span>}
              </label>
              <input
                type='text'
                name='name'
                value={user.name}
                onChange={handleChange}
                minLength='6'
                maxLength='16'
              />
            </div>
            <div
              className={`input-wrapper ${
                errors.includes('password') || error ? 'error' : ''
              }`}
            >
              <label htmlFor='password'>
                PASSWORD
                {errors.includes('password') && (
                  <span> - Password is required</span>
                )}
                {error && error.message === 'Invalid credentials' && (
                  <span> - {error.message}</span>
                )}
              </label>
              <input
                type='password'
                name='password'
                value={user.password}
                onChange={handleChange}
                minLength='3'
                maxLength='16'
              />
            </div>

            <button type='submit' className='auth-button'>
              {loading ? 'Loading...' : 'Sign up'}
            </button>

            <Link to='/login'>Already have an account?</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
