import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Input } from 'semantic-ui-react';
import { Linear } from '@rl-js/configuration/hyperparameters';

const style = {
  width: 'auto',
};

const parseInput = value => Number.parseFloat(value);

const LinearDefinition = ({ definition, setDefinition }) => {
  const onChange = (min, max) => setDefinition(new Linear({
    name: definition.getName(),
    min,
    max,
    default: definition.defaultValue(),
  }));
  const onMinChange = (e, { value }) => onChange(parseInput(value), definition.max);
  const onMaxChange = (e, { value }) => onChange(definition.min, parseInput(value));

  return (
    <Grid.Row>
      <Input style={{ ...style, marginRight: '1em' }} label="min" id={definition.getName()} defaultValue={definition.min} onChange={onMinChange} />
      <Input style={style} label="max" id={definition.getName()} defaultValue={definition.max} onChange={onMaxChange} />
    </Grid.Row>
  );
};

LinearDefinition.propTypes = {
  definition: PropTypes.shape({
    getName: PropTypes.func,
  }).isRequired,
  setDefinition: PropTypes.func.isRequired,
};

export default LinearDefinition;
