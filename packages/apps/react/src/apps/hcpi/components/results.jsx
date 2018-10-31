import React from 'react';
import {
  Container, Header, Divider, Progress,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { LearningCurve, DivergenceRate } from '../../../components';

const getTitle = (type, agent, environment) => `${type} (${agent.id}, ${environment.id})`;

const Results = ({
  results, errors, trials, agent, environment, improvements, successes
}) => (
  <Container>
    <Divider />
    <Header as="h2">Results</Header>
    <Progress progress="value" autoSuccess value={successes + errors} total={trials} />
    {/* <LearningCurve trials={results} title={getTitle('Learning Curve', agent, environment)} /> */}
    <DivergenceRate successes={improvements} divergences={successes - improvements} title={getTitle('Error Rate', agent, environment)} />
  </Container>
);

const mapStateToProps = state => ({
  improvements: state.improvements,
  results: state.results,
  errors: state.errors,
  trials: state.trials,
  successes: state.successes,
});

export default connect(mapStateToProps)(Results);
