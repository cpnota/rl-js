import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Input } from 'semantic-ui-react';
import { Fixed } from '@rl-js/configuration/hyperparameters';

const style = {
  width: 'auto',
};

const parseInput = value => Number.parseFloat(value);

const FixedDefinition = ({ definition, setDefinition }) => {
  const onChange = (e, { value }) => setDefinition(new Fixed({
    name: definition.getName(),
    value: parseInput(value),
  }));

  return (
    <Grid.Row>
      <Input
        style={style}
        id={definition.getName()}
        defaultValue={definition.defaultValue()}
        onChange={onChange}
      />
    </Grid.Row>
  );
};

FixedDefinition.propTypes = {
  definition: PropTypes.shape({
    getName: PropTypes.func,
  }).isRequired,
  setDefinition: PropTypes.func.isRequired,
};

export default FixedDefinition;
