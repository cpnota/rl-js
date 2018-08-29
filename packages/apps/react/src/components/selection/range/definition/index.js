import React from 'react';
import PropTypes from 'prop-types';
import Linear from './linear';
import Exponential from './exponential';
import Fixed from './fixed';
import Discrete from './discrete';
import ReadOnly from './read-only';

const getComponent = (definition) => {
  switch (definition.constructor.name) {
    case 'Linear':
      return Linear;
    case 'Exponential':
      return Exponential;
    case 'Discrete':
      return Discrete;
    case 'Fixed':
      return Fixed;
    default: {
      return ReadOnly;
    }
  }
};

const Definition = ({ definition, setDefinition }) => {
  const Component = getComponent(definition);
  return <Component definition={definition} setDefinition={setDefinition} />;
};

Definition.propTypes = {
  definition: PropTypes.shape({
    getName: PropTypes.func,
  }).isRequired,
  setDefinition: PropTypes.func.isRequired,
};

export default Definition;
