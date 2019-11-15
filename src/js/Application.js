import React, { useState } from 'react';
import Login from './views/Login';
import Dashboard from './views/Dashboard';

const Application = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  if (!loggedIn) {
    return <Login onLogin={setLoggedIn} />;
  }

  return <Dashboard />;
};

export default Application;
