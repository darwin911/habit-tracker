import React, { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';

interface UserObject {
  name: string | null | undefined;
  email: string | null | undefined;
  uid: string | undefined;
}

interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserObject | null>>;
}

export const Authentication: React.FC<Props> = ({
  setIsLoggedIn,
  setCurrentUser
}) => {
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
          setCurrentUser={setCurrentUser}
        />
      )}
    </div>
  );
};
