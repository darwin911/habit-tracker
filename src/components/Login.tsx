import React, { useState, useEffect } from 'react';
import { Input, Segment } from 'semantic-ui-react';

interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const secret = process.env.REACT_APP_LOGIN_CODE;

export const Login: React.FC<Props> = ({ setIsLoggedIn }) => {
  console.log('Login Disabled');
  const [loginCode, setLoginCode] = useState('anker');

  useEffect(() => {
    const checkLoginCode = (code: string) => {
      loginCode === secret ? setIsLoggedIn(true) : setIsLoggedIn(false);
    };
    checkLoginCode(loginCode);
  }, [loginCode, setIsLoggedIn]);
  return (
    <Segment>
      <Input
        size='huge'
        type='password'
        onChange={e => setLoginCode(e.target.value)}
      />
    </Segment>
  );
};
