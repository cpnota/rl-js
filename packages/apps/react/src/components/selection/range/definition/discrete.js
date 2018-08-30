import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Discrete } from '@rl-js/configuration/hyperparameters';

const DiscreteDefinition = ({ definition, setDefinition }) => (
  <Dropdown
    placeholder={definition.getName()}
    fluid
    multiple
    selection
    value={definition.values}
    onChange={(e, { value }) => (
      setDefinition(new Discrete({ name: definition.getName(), values: value }))
    )}
    options={definition.values.map(v => ({ key: v, value: v, text: v }))}
  />
);

export default DiscreteDefinition;
