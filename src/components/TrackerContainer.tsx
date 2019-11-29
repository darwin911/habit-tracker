import React, { useState, useEffect } from 'react';
import { Button, Icon, Input } from 'semantic-ui-react';
import moment from 'moment';
import firebase from '../firebase';
import { Entry } from './Entry';
import { HomeWorkTracking } from './HomeWorkTracking';

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
  userId: string | undefined;
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
    const user = firebase.auth().currentUser;
    if (user) {
      const unsubscribe = firebase
        .firestore()
        .collection('entries')
        .where('dayOfYear', '==', today)
        .where('userId', '==', user.uid)
        .onSnapshot(snapshot => {
          const newEntries = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          setTodaysEntries(newEntries);
        });
      return () => unsubscribe();
    }
  }, []);

  return todaysEntries;
};

export const TrackerContainer: React.FC<Props> = ({
  user,
  setIsLoggedIn,
  setCurrentUser
}) => {
  const [newActivityName, setnewActivityName] = useState<string>('');
  const entries = useEntries();
  console.log(typeof entries, entries);

  const addEntry = (action: string) => {
    if (user) {
      const { uid } = user;
      const date = new Date();
      const entry: NewEntry = {
        userId: uid,
        action,
        timestamp: Date.now(),
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        dayOfYear: today
      };

      console.log(entry);

      firebase
        .firestore()
        .collection('entries')
        .add(entry)
        .catch(err => console.log(err));
    }
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

  const userActivitiesRef = firebase.firestore().collection('user_activities');

  const createActivity = () => {
    console.log('create activity', newActivityName);
    if (user) {
      // find user
      const activitiesRef = userActivitiesRef.doc(user.uid);
      activitiesRef.update({
        activities: firebase.firestore.FieldValue.arrayUnion(newActivityName)
      });
    }
  };

  return (
    <div style={{ width: 600, maxWidth: '90vw', margin: '0 auto' }}>
      <Button onClick={handleLogout}>Logout</Button>
      <h1>Hello {user && user.name}!</h1>
      {/* <HomeWorkTracking addEntry={addEntry} /> */}
      <h2>Activities</h2>
      <Input
        value={newActivityName}
        onChange={e => setnewActivityName(e.target.value)}></Input>
      <Button onClick={createActivity}>Add</Button>

      <h2>Today's entry: </h2>
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
