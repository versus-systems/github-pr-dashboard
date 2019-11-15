import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState('');

  const login = () => {
    axios.post('/login', { password }).then((res) => {
      localStorage.setItem('token', res.data.token);
      onLogin(true);
    }).catch(() => {
      alert("Login Failed") // eslint-disable-line
    });
  };

  return (
    <div>
      <h1>VS Engineering Dashboard</h1>
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={login}>LOGIN</button>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
