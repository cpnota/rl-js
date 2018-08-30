import React from 'react';
import {
  Container, Header, Divider, Progress,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { LearningCurve, DivergenceRate } from '../../../components';

const getTitle = (type, agent, environment) => `${type} (${agent.id}, ${environment.id})`;

const Results = ({
  results, errors, trials, agent, environment,
}) => (
  <Container>
    <Divider />
    <Header as="h2">Results</Header>
    <Progress progress="value" autoSuccess value={results.length + errors} total={trials} />
    <LearningCurve trials={results} title={getTitle('Learning Curve', agent, environment)} />
    <DivergenceRate successes={results.length} divergences={errors} title={getTitle('Divergence Rate', agent, environment)} />
  </Container>
);

const mapStateToProps = state => ({
  results: state.results,
  errors: state.errors,
  trials: state.trials,
});

export default connect(mapStateToProps)(Results);
