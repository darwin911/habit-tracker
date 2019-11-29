import React, { useState, useEffect } from 'react';
import './scss/style.css';
import 'semantic-ui-css/semantic.min.css';
import firebase from './firebase';
import { Authentication } from './components/Authentication';
import { TrackerContainer } from './components/TrackerContainer';

interface UserObject {
  name: string | null | undefined;
  email: string | null | undefined;
  uid: string | undefined;
}

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserObject | null>(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        const userObj = {
          name: user.displayName,
          email: user.email,
          uid: user.uid
        };
        console.log('User is signed in');
        console.log(userObj);
        setCurrentUser(userObj);
        setIsLoggedIn(true);
      } else {
        // No user is signed in.
        console.log('not signed in');
      }
    });
  }, []);

  return (
    <div className='App'>
      <h1>Habit Tracker</h1>
      {isLoggedIn && currentUser ? (
        <TrackerContainer
          user={currentUser}
          setIsLoggedIn={setIsLoggedIn}
          setCurrentUser={setCurrentUser}
        />
      ) : (
        <>
          <Authentication
            setIsLoggedIn={setIsLoggedIn}
            setCurrentUser={setCurrentUser}
          />
        </>
      )}
    </div>
  );
};

export default App;
