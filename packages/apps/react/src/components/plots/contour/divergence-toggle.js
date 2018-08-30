import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

const DivergenceToggle = ({ value, onChange }) => (
  <Button.Group onClick={e => e.preventDefault()}>
    <Button positive={value === false} onClick={() => onChange(false)}>Returns</Button>
    <Button.Or />
=
    <Button positive={value === true} onClick={() => onChange(true)}>Divergence</Button>
  </Button.Group>
);

DivergenceToggle.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DivergenceToggle;
