import React, { useState, useEffect } from 'react';
import { Button, Icon } from 'semantic-ui-react';
// import moment from 'moment';
import firebase from '../firebase';
import { Entry } from './Entry';

interface Props {}

interface NewEntry {
  action: string;
  timestamp: firebase.firestore.Timestamp;
  day: number;
  month: number;
  year: number;
}

interface DatabaseEntry {
  id: string;
  action: string;
  timestamp: firebase.firestore.Timestamp;
  day: number;
  month: number;
  year: number;
}

const useEntries = () => {
  const [allEntries, setAllEntries] = useState();
  useEffect(() => {
    firebase
      .firestore()
      .collection('entries')
      .onSnapshot(snapshot => {
        const newEntries = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setAllEntries(newEntries);
      });
  }, []);

  return allEntries;
};

export const TrackerContainer: React.FC<Props> = () => {
  // const [homeLeaveTime, setHomeLeaveTime] = useState<null | string>(null);
  const entries = useEntries();
  console.log(typeof entries, entries);

  const addEntry = (action: string) => {
    const firebaseTime = firebase.firestore.Timestamp.fromDate(new Date());
    const now = new Date(firebaseTime.seconds * 1000).toDateString();
    const entry: NewEntry = {
      action,
      timestamp: firebase.firestore.Timestamp.now(),
      day: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear()
    };
    console.log(action);
    console.log(entry);

    firebase
      .firestore()
      .collection('entries')
      .add(entry)
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Hi Darwin!</h1>
      <h2>Today's entry: </h2>
      <Button.Group vertical>
        <Button onClick={() => addEntry('LEAVE_HOME')} positive>
          Leave Home
        </Button>
        <Button onClick={() => addEntry('ARRIVE_WORK')} positive>
          Arrive Work
        </Button>
        <Button onClick={() => addEntry('LEAVE_WORK')} negative>
          Leave Work
        </Button>
        <Button onClick={() => addEntry('ARRIVE_HOME')} negative>
          Arrive Home
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
