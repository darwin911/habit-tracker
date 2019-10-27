import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
// import moment from 'moment';
import firebase from '../firebase';

interface Props {
  entries: object[];
}

interface DailyEntry {
  action: string;
  timestamp: firebase.firestore.Timestamp;
  day: number;
  month: number;
  year: number;
}
export const TrackerContainer: React.FC<Props> = ({ entries }) => {
  const [homeLeaveTime, setHomeLeaveTime] = useState<null | string>(null);
  const [dailyEntries, setDailyEntries] = useState<object[]>([]);

  const handleLeaveHome = () => {
    const firebaseTime = firebase.firestore.Timestamp.fromDate(new Date());
    const now = new Date(firebaseTime.seconds * 1000).toDateString();

    const dailyEntriesRef = firebase.firestore().collection('daily_entries');

    const entry: DailyEntry = {
      action: 'LEAVE_HOME',
      timestamp: firebase.firestore.Timestamp.now(),
      day: new Date().getDay(),
      month: new Date().getMonth(),
      year: new Date().getFullYear()
    };

    dailyEntriesRef.add(entry);

    setHomeLeaveTime(now);
  };

  return (
    <div>
      <h1>Hi Darwin!</h1>
      <Button onClick={() => handleLeaveHome()}>Leave Home</Button>
      <p>{homeLeaveTime}</p>
    </div>
  );
};
