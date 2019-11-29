import React, { useState } from 'react';
import { Form, Message } from 'semantic-ui-react';
import firebase from '../firebase';

interface UserObject {
  name: string | null | undefined;
  email: string | null | undefined;
  uid: string | undefined;
}

interface Props {
  toggleLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserObject | null>>;
}

interface ErrorCode {
  code: string;
  message: string;
}

export const Register: React.FC<Props> = ({
  toggleLoginForm,
  setCurrentUser
}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorCode | null>(null);

  const handleRegister = () => {
    setIsLoading(true);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        const { user } = data;
        if (user) {
          user
            .updateProfile({
              displayName: name
            })
            .then(() => {
              firebase
                .firestore()
                .collection('user_activities')
                .doc(user.uid)
                .set({
                  activities: []
                });

              setCurrentUser({
                name: user.displayName,
                email: user.email,
                uid: user.uid
              });
            });
        }
      })
      .catch(err => {
        setError(err);
        console.log(err);
        setIsLoading(false);
      });

    setIsLoading(false);
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
