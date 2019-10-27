import React, { useState, useEffect } from 'react';
import { Input, Segment } from 'semantic-ui-react';

interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const secret = process.env.REACT_APP_LOGIN_CODE;

export const Login: React.FC<Props> = ({ setIsLoggedIn }) => {
  const [loginCode, setLoginCode] = useState('');
  const checkLoginCode = (code: string) => {
    loginCode === secret ? setIsLoggedIn(true) : setIsLoggedIn(false);
  };

  useEffect(() => {
    checkLoginCode(loginCode);
  }, [loginCode]);
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
