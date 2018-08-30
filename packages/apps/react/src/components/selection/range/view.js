import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Checkbox } from 'semantic-ui-react';
import Definition from './definition';

/* eslint-disable jsx-a11y/label-has-for */
const RangeSelection = ({
  definitions,
  onSubmit,
  setDefinition,
  setFixed,
  setIsFixed,
}) => (
  <Form onSubmit={onSubmit} size="large">
    {
      definitions.map(({ definition, fixed, isFixed }) => (
        <Form.Field key={definition.getName()}>
          <label htmlFor={definition.getName()}>
            {definition.getName()}
            <br />
            <Checkbox toggle checked={!isFixed} onChange={() => setIsFixed(definition.getName(), !isFixed)} />
            <Definition definition={isFixed ? fixed : definition} setDefinition={isFixed ? setFixed : setDefinition} />
          </label>
        </Form.Field>
      ))
    }
    <Button primary type="submit">Next</Button>
  </Form>
);

RangeSelection.propTypes = {
  definitions: PropTypes.arrayOf(PropTypes.shape({
    getName: PropTypes.func,
  })).isRequired, // TODO
  setDefinition: PropTypes.func.isRequired,
  setFixed: PropTypes.func.isRequired,
  setIsFixed: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default RangeSelection;
