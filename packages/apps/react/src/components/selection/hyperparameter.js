import React from 'react';
import PropTypes from 'prop-types';
import configuration from '@rl-js/configuration';
import { Form, Button } from 'semantic-ui-react';

const handleChange = (name, setHyperparameter) => e => (
  setHyperparameter(name, e.target.value != null ? Number(e.target.value) : undefined)
);

const HyperparameterSelection = ({
  agent,
  hyperparameters,
  setHyperparameter,
  onSubmit,
}) => (
  <Form onSubmit={onSubmit} size="large">
    {
      configuration
        .getAgentSuite(agent.suite)
        .getAgentBuilder(agent.id)
        .getHyperparameterDefinitions()
        .map(definition => (
          { name: definition.getName(), defaultValue: definition.defaultValue() }))
        .map(({ name, defaultValue }) => (
          <Form.Field key={name}>
            <label htmlFor={name}>
              {name}
              <input
                style={{ textAlign: 'right' }}
                id={name}
                placeholder={defaultValue}
                value={hyperparameters[name]}
                onChange={handleChange(name, setHyperparameter)}
              />
            </label>
          </Form.Field>
        ))
    }
    <Button primary type="submit">Next</Button>
  </Form>
);

HyperparameterSelection.propTypes = {
  agent: PropTypes.shape({
    suite: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  hyperparameters: PropTypes.objectOf(PropTypes.any),
  setHyperparameter: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

HyperparameterSelection.defaultProps = {
  hyperparameters: {},
};

export default HyperparameterSelection;
