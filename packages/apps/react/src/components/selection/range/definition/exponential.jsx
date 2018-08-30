import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Input } from 'semantic-ui-react';
import { Exponential } from '@rl-js/configuration/hyperparameters';

const styles = {
  left: {
    width: 'auto',
    marginRight: '1em',
  },
  right: {
    width: 'auto',
  },
  base: {
    marginTop: '1em',
  },
};

const parseInput = value => Number.parseFloat(value);

const ExponentialDefinition = ({ definition, setDefinition }) => {
  const onChange = (min, max, base) => setDefinition(new Exponential({
    name: definition.getName(),
    min,
    max,
    base,
    default: definition.defaultValue(),
  }));
  const onMinChange = (e, { value }) => (
    onChange(parseInput(value), definition.max, definition.base)
  );
  const onMaxChange = (e, { value }) => (
    onChange(definition.min, parseInput(value), definition.base)
  );
  const onBaseChange = (e, { value }) => (
    onChange(definition.min, definition.max, parseInput(value))
  );

  return (
    <div>
      <Grid.Row>
        <Input
          style={styles.left}
          label="min"
          id={definition.getName()}
          defaultValue={definition.min}
          onChange={onMinChange}
        />
        <Input
          style={styles.right}
          label="max"
          id={definition.getName()}
          defaultValue={definition.max}
          onChange={onMaxChange}
        />
      </Grid.Row>
      <Input
        style={styles.base}
        label="base"
        id={definition.getName()}
        defaultValue={definition.base}
        onChange={onBaseChange}
      />
    </div>
  );
};

ExponentialDefinition.propTypes = {
  definition: PropTypes.shape({
    getName: PropTypes.func,
  }).isRequired,
  setDefinition: PropTypes.func.isRequired,
};

export default ExponentialDefinition;
