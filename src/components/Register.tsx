import React, { useState } from 'react';
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

export const Register: React.FC<Props> = ({
  setIsLoggedIn,
  toggleLoginForm
}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorCode | null>(null);

  const handleRegister = async () => {
    setIsLoading(true);
    console.log(email, password);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
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
        type='text'
        placeholder='Carl Sagan'
        onChange={e => setName(e.target.value)}
      />
      <Form.Input
        type='Email'
        placeholder='user@email.com'
        onChange={e => setEmail(e.target.value)}
      />
      <Form.Input
        type='password'
        placeholder='Password'
        onChange={e => setPassword(e.target.value)}
      />
      <Form.Button onClick={handleRegister}>Create Account</Form.Button>
      <Form.Button onClick={() => toggleLoginForm(val => !val)}>
        Log In
      </Form.Button>
      {error && <Message error header={error.code} content={error.message} />}
    </Form>
  );
};
