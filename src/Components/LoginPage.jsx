import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        onLogin();
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='loginPage'>
      <div className='loginPage__containTitle'>
        <h1 className='loginPage__title'>The Infamous To-Do-List</h1>
      </div>
      <form onSubmit={handleSubmit} className='loginPage__form'>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type='text'
          className='loginPage__input'
          placeholder='Username'
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type='password'
          className='loginPage__input'
          placeholder='Password'
        />
        <button type='submit' className='loginPage__btnSub'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
