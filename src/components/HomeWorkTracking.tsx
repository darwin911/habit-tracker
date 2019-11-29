import React from 'react';
import moment from 'moment';
import { Button, Divider, Icon } from 'semantic-ui-react';

interface Props {
  addEntry: (action: string) => void;
}

export const HomeWorkTracking: React.FC<Props> = ({ addEntry }) => {
  return (
    <div>
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
    </div>
  );
};
