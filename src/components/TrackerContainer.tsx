import React, { useState, useEffect } from 'react';
import { Button, Icon, Divider } from 'semantic-ui-react';
import moment from 'moment';
import firebase from '../firebase';
import { Entry } from './Entry';

interface UserObject {
  name: string | null | undefined;
  email: string | null | undefined;
  uid: string | undefined;
}

interface Props {
  user: UserObject | null;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserObject | null>>;
}

interface NewEntry {
  action: string;
  timestamp: number;
  day: number;
  month: number;
  year: number;
  dayOfYear: number;
}

interface DatabaseEntry {
  id: string;
  action: string;
  timestamp: number;
  day: number;
  month: number;
  year: number;
  dayOfYear: number;
}

const today = moment()
  .startOf('day')
  .dayOfYear();

const useEntries = () => {
  const [todaysEntries, setTodaysEntries] = useState();

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('entries')
      .where('dayOfYear', '==', today)
      .onSnapshot(snapshot => {
        const newEntries = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setTodaysEntries(newEntries);
      });

    return () => unsubscribe();
  }, []);

  return todaysEntries;
};

export const TrackerContainer: React.FC<Props> = ({
  user,
  setIsLoggedIn,
  setCurrentUser
}) => {
  const entries = useEntries();
  console.log(typeof entries, entries);

  const addEntry = (action: string) => {
    const date = new Date();
    const entry: NewEntry = {
      action,
      timestamp: Date.now(),
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      dayOfYear: today
    };

    console.log(entry);

    firebase
      .firestore()
      .collection('entries')
      .add(entry)
      .catch(err => console.log(err));
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          console.log('Signed Out');
          setIsLoggedIn(false);
          setCurrentUser(null);
        },
        function(error) {
          console.error('Sign Out Error', error);
        }
      );
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <Button onClick={handleLogout}>Logout</Button>
      <h1>Hello {user && user.name}!</h1>
      <h2>Today's entry: </h2>
      <Button.Group fluid>
        <Button onClick={() => addEntry('LEAVE_HOME')} animated='fade'>
          <Button.Content visible>Leave Home</Button.Content>
          <Button.Content hidden>{moment().format('hh:mm a')}</Button.Content>
        </Button>
        <Button icon>
          <Icon name='home' />
        </Button>
        <Button onClick={() => addEntry('ARRIVE_HOME')} animated='fade'>
          <Button.Content visible>Arrive Home</Button.Content>
          <Button.Content hidden>{moment().format('hh:mm a')}</Button.Content>
        </Button>
      </Button.Group>
      <Divider />
      <Button.Group fluid>
        <Button onClick={() => addEntry('ARRIVE_WORK')} animated='fade'>
          <Button.Content visible>Arrive Work</Button.Content>
          <Button.Content hidden>{moment().format('hh:mm a')}</Button.Content>
        </Button>
        <Button icon>
          <Icon name='building' />
        </Button>
        <Button onClick={() => addEntry('LEAVE_WORK')} animated='fade'>
          <Button.Content visible>Leave Work</Button.Content>
          <Button.Content hidden>{moment().format('hh:mm a')}</Button.Content>
        </Button>
      </Button.Group>

      <div className='entries'>
        {entries ? (
          entries.map((entry: DatabaseEntry) => (
            <Entry key={entry.id} entry={entry} />
          ))
        ) : (
          <Icon name='sync' loading size='big' />
        )}
      </div>
    </div>
  );
};
