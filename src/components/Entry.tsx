import React from 'react';
import moment from 'moment';
import { Table, Label } from 'semantic-ui-react';

interface Props {
  entry: DatabaseEntry;
}

interface DatabaseEntry {
  id: string;
  action: string;
  timestamp: number;
  day: number;
  month: number;
  year: number;
}

export const Entry: React.FC<Props> = ({ entry }) => {
  const time = moment(entry.timestamp).format('hh:mm:ss a');
  return (
    <Table className='entry' celled collapsing>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Time</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Label ribbon>{time}</Label>
          </Table.Cell>
          <Table.Cell>{entry.action}</Table.Cell>
          <Table.Cell>
            {entry.month}/{entry.day}/{entry.year}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
