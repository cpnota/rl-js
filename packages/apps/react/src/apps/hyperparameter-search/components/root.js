import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Header } from 'semantic-ui-react';
import configuration from '@rl-js/configuration';
import Stepper from './stepper';
import {
  AgentSelection,
  EnvironmentSelection,
  RangeSelection,
} from '../../../components';
import Results from './results';
import RunConfig from './run-config';
import * as actions from '../actions';

console.log(AgentSelection)

const getEnvironmentType = agent => configuration
  .getAgentSuite(agent.suite)
  .getEnvironmentType();

const HyperparameterSearch = ({
  agent,
  environment,
  selectAgent,
  selectEnvironment,
  setHyperparameterRanges,
  // stepForward,
  stepBackward,
  step,
  hyperparameters,
  queueTasks,
  title,
  sensitivity,
}) => {
  const getComponent = () => {
    switch (step) {
      case 0:
        return <AgentSelection key="agent-selection" agent={agent} onChange={selectAgent} />;
      case 1:
        return <EnvironmentSelection key="environment-selection" environmentType={getEnvironmentType(agent)} environment={environment} onChange={selectEnvironment} />;
      case 2:
        return <RangeSelection key="range-selection" agent={agent} onSubmit={setHyperparameterRanges} definitions={hyperparameters} />;
      case 3:
        return <RunConfig key="run-config" queueTasks={queueTasks} />;
      default:
        return <Results key="results" agent={agent} environment={environment} sensitivity={sensitivity} />;
    }
  };

  return (
    <Header textAlign="center">
      <Header>{ title }</Header>
      <Stepper agent={agent} environment={environment} stepBackward={stepBackward} />
      <Grid centered style={{ marginTop: '5px' }}>
        {getComponent()}
      </Grid>
    </Header>
  );
};

HyperparameterSearch.propTypes = {
  title: PropTypes.string,
  sensitivity: PropTypes.bool,
  agent: PropTypes.shape({
    id: PropTypes.string,
    suite: PropTypes.string,
  }),
  environment: PropTypes.shape({
    id: PropTypes.string,
    suite: PropTypes.string,
  }),
  hyperparameters: PropTypes.objectOf(PropTypes.any),
  selectAgent: PropTypes.func.isRequired,
  selectEnvironment: PropTypes.func.isRequired,
  setHyperparameterRanges: PropTypes.func.isRequired,
  // stepForward: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  stepBackward: PropTypes.func.isRequired,
  queueTasks: PropTypes.func.isRequired,
};

HyperparameterSearch.defaultProps = {
  title: 'Hyperparameter Search',
  sensitivity: false,
  agent: undefined,
  environment: undefined,
  hyperparameters: undefined,
};

const mapStateToProps = state => ({
  agent: state.config.agent,
  environment: state.config.environment,
  step: state.config.step,
});

const mapDispatchToProps = (dispatch, { queueTasks }) => ({
  selectAgent: (agent) => {
    dispatch(actions.selectAgent(agent));
    dispatch(actions.stepForward());
  },
  selectEnvironment: (environment) => {
    dispatch(actions.selectEnvironment(environment));
    dispatch(actions.stepForward());
  },
  queueTasks: (tasks) => {
    queueTasks(tasks);
    dispatch(actions.stepForward());
  },
  setHyperparameterRanges: (definitions) => {
    dispatch(actions.setHyperparameterRanges(definitions));
    dispatch(actions.stepForward());
  },
  stepForward: () => dispatch(actions.stepForward()),
  stepBackward: () => dispatch(actions.stepBackward()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HyperparameterSearch);
