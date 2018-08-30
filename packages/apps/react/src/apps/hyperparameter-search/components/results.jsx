import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Container, Header, Divider, Progress,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
  ContourPlot,
  DivergenceRate,
  Sensitivity,
} from '../../../components';
import ResultsTable from './results-table';

const getTitle = (type, agent, environment) => `${type} (${agent.id}, ${environment.id})`;

const Results = ({
  results, agent, environment, completed, diverged, tasks, definitions, sensitivity,
}) => (
  <Container>
    <Divider />
    <Header as="h2">Results</Header>
    <Progress progress="value" autoSuccess value={completed + diverged} total={tasks} />
    <Grid stackable>
      {sensitivity ? [
        <Sensitivity title={getTitle('Hyperparameter Sensitivity', agent, environment)} results={results.map(([, r]) => r)} />,
        <DivergenceRate successes={completed} divergences={diverged} />,
      ] : [
        <ResultsTable />,
        <ContourPlot
          title={getTitle('Mean Returns', agent, environment)}
          results={results}
          definitions={definitions}
        />,
      ]}


    </Grid>
  </Container>
);

Results.propTypes = {
  results: PropTypes.arrayOf(PropTypes.array).isRequired,
  agent: PropTypes.shape({ id: PropTypes.string }).isRequired,
  environment: PropTypes.shape({ id: PropTypes.string }).isRequired,
  completed: PropTypes.number.isRequired,
  diverged: PropTypes.number.isRequired,
  tasks: PropTypes.number.isRequired,
  definitions: PropTypes.arrayOf(PropTypes.object).isRequired,
  sensitivity: PropTypes.bool,
};

Results.defaultProps = {
  sensitivity: false,
};

const mapStateToProps = state => ({
  results: state.results.byMean,
  completed: state.results.completed,
  diverged: state.results.diverged,
  tasks: state.results.tasks,
  definitions: state.config.definitions,
});

export default connect(mapStateToProps)(Results);
