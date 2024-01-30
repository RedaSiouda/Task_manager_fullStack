// main.js
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import LoginPage from './Components/LoginPage.jsx';
import './index.css';

const Root = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Set the login state to true after successful login
    setLoggedIn(true);
  };

  return (
    <React.StrictMode>
      {isLoggedIn ? <App /> : <LoginPage onLogin={handleLogin} />}
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
