import React from 'react';
import {
  Container, Header, Divider, Progress,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { LearningCurve, DivergenceRate } from '../../../components';
import Environment from './environments';

const getTitle = (type, agent, environment) => `${type} (${agent.id}, ${environment.id})`;

const Results = ({
  results, errors, trials, agent, environment,
}) => (
  <Container>
    <Divider />
    <Environment />
    <LearningCurve trials={results} title={getTitle('Learning Curve', agent, environment)} />
  </Container>
);

const mapStateToProps = state => ({
  results: state.results,
  errors: state.errors,
  trials: state.trials,
});

export default connect(mapStateToProps)(Results);
