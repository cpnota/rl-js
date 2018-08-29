import React from 'react';
import { Button, Icon, Header } from 'semantic-ui-react';

const styles = {
  center: {
    maxWidth: '300px',
    margin: 'auto',
  },
  button: {
    margin: '5px',
  },
};

const NewApp = ({ add, appTypes }) => (
  <div style={styles.center}>
    <Header>Run a new experiment:</Header>
    {appTypes.map(appType => (
      <div key={appType.name}>
        <Button style={styles.button} basic onClick={add(appType)} size="large">
          <Icon name={appType.icon || 'chart bar'} />
          {appType.name}
        </Button>
      </div>
    ))}
  </div>
);

export default NewApp;
