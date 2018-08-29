import React from 'react';
import PropTypes from 'prop-types';

const ReadOnly = ({ definition }) => (
  <input disabled id={definition.getName()} value={definition.defaultValue()} />
);

ReadOnly.propTypes = {
  definition: PropTypes.shape({
    getName: PropTypes.func,
    defaultValue: PropTypes.func,
  }).isRequired,
};

export default ReadOnly;
