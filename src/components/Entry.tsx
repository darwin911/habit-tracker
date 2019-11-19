import React from 'react';
import moment from 'moment';

interface Props {
  entry: DatabaseEntry;
}

interface DatabaseEntry {
  id: string;
  action: string;
  timestamp: firebase.firestore.Timestamp;
  day: number;
  month: number;
  year: number;
}

export const Entry: React.FC<Props> = ({ entry }) => {
  const time = moment(entry.timestamp.seconds * 1000).format('hh:mm:ss a');

  return (
    <div key={entry.id} className='entry'>
      <p>Action: {entry.action}</p>
      <p className='entry__date'>
        Date: {entry.month + 1}/{entry.day}/{entry.year}
      </p>
      <p className='entry__time'>Time: {time}</p>
    </div>
  );
};
