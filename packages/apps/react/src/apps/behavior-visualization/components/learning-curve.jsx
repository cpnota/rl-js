import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Header } from 'semantic-ui-react';
import configuration from '@rl-js/configuration';
import LearningCurveStepper from './stepper';
import {
  AgentSelection,
  EnvironmentSelection,
  HyperparameterSelection,
} from '../../../components';
import Results from './results';
import RunConfig from './run-config';
import * as actions from '../actions';

const getEnvironmentType = agent => configuration
  .getAgentSuite(agent.suite)
  .getEnvironmentType();

const LearningCurve = ({
  agent,
  environment,
  selectAgent,
  selectEnvironment,
  setHyperparameter,
  stepForward,
  stepBackward,
  step,
  hyperparameters,
  queueTasks,
}) => (
  <Header textAlign="center">
    <Header>Learning Curve</Header>
    <LearningCurveStepper agent={agent} environment={environment} stepBackward={stepBackward} />
    <Grid centered style={{ marginTop: '5px' }}>
      {[
        step === 0 && <AgentSelection key="agent-selection" agent={agent} onChange={selectAgent} />,
        step === 1 && <EnvironmentSelection key="environment-selection" environmentType={getEnvironmentType(agent)} environment={environment} onChange={selectEnvironment} />,
        step === 2 && <HyperparameterSelection key="hyperparameter-selection" agent={agent} setHyperparameter={setHyperparameter} onSubmit={stepForward} hyperparameters={hyperparameters} />,
        step === 3 && <RunConfig key="run-config" queueTasks={queueTasks} />,
        step === 4 && <Results key="results" agent={agent} environment={environment} />,
      ]}
    </Grid>
  </Header>
);

LearningCurve.propTypes = {
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
  setHyperparameter: PropTypes.func.isRequired,
  stepForward: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  stepBackward: PropTypes.func.isRequired,
  queueTasks: PropTypes.func.isRequired,
};

LearningCurve.defaultProps = {
  agent: undefined,
  environment: undefined,
  hyperparameters: undefined,
};

const mapStateToProps = state => ({
  agent: state.agent,
  environment: state.environment,
  step: state.step,
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
  setHyperparameter: (name, value) => dispatch(actions.setHyperparameter(name, value)),
  stepForward: () => dispatch(actions.stepForward()),
  stepBackward: () => dispatch(actions.stepBackward()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LearningCurve);
