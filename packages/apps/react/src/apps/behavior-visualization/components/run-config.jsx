import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const RunConfig = ({
  start,
}) => (
  <Form onSubmit={start}>
    <Form.Button primary content="submit">Run</Form.Button>
  </Form>
);

RunConfig.propTypes = {
  start: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  start: () => {
    dispatch(actions.stepForward());
    dispatch(actions.start());
  },
});

export default connect(() => {}, mapDispatchToProps)(RunConfig);
