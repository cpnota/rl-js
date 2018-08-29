import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

/* eslint-disable jsx-a11y/label-has-for */
const ParamSelector = ({
  param, label, definitions, onChange,
}) => (
  <div>
    <label style={{ marginRight: '5px' }}>{label}</label>
    <Dropdown
      selection
      placeholder="Select parameter"
      value={param}
      onChange={(e, { value }) => onChange(value)}
      options={definitions.map(d => ({ key: d.getName(), value: d.getName(), text: d.getName() }))}
    />
  </div>
);

ParamSelector.propTypes = {
  param: PropTypes.string.isRequired,
  definitions: PropTypes.arrayOf(PropTypes.shape({
    getName: PropTypes.func,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default ParamSelector;
