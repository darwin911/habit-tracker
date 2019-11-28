import React, { useState, useEffect } from 'react';
import { Form, Message } from 'semantic-ui-react';
import firebase from '../firebase';

interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  toggleLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ErrorCode {
  code: string;
  message: string;
}

export const Login: React.FC<Props> = ({ setIsLoggedIn, toggleLoginForm }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorCode | null>(null);

  const handleLogin = async () => {
    setIsLoading(true);
    console.log(email, password);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(thing => {
        console.log(thing);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <Form loading={isLoading} error>
      <Form.Input
        type='Email'
        placeholder='email'
        onChange={e => setEmail(e.target.value)}
      />
      <Form.Input
        type='password'
        placeholder='Password'
        onChange={e => setPassword(e.target.value)}
      />
      <Form.Button onClick={handleLogin}>Login</Form.Button>
      <Form.Button onClick={() => toggleLoginForm(val => !val)}>
        Create Account
      </Form.Button>
      {error && <Message error header={error.code} content={error.message} />}
    </Form>
  );
};
