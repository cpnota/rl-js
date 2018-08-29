import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable jsx-a11y/label-has-for */
const RangeInput = ({
  onChange,
  label,
}) => (
  <div>
    <label style={{ marginRight: '5px' }}>{label}</label>
    <input onChange={onChange} />
  </div>
);

RangeInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default RangeInput;
