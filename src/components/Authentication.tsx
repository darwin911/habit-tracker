import React, { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';

interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Authentication: React.FC<Props> = ({ setIsLoggedIn }) => {
  const [loginForm, toggleLoginForm] = useState<boolean>(true);
  return (
    <div className='authentication'>
      <h1>{loginForm ? 'Login' : 'Register'}</h1>
      {loginForm ? (
        <Login
          setIsLoggedIn={setIsLoggedIn}
          toggleLoginForm={toggleLoginForm}
        />
      ) : (
        <Register
          setIsLoggedIn={setIsLoggedIn}
          toggleLoginForm={toggleLoginForm}
        />
      )}
    </div>
  );
};
