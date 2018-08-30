import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Step, Button } from 'semantic-ui-react';

const LearningCurveStepper = ({
  step, agent, environment, stepBackward,
}) => (
  <Step.Group stackable="tablet">
    {step > 0 && step < 4 && (
      <Button icon onClick={stepBackward}>
        <Icon name="arrow left" />
      </Button>
    )}

    <Step active={step === 0}>
      <Icon name="user secret" />
      <Step.Content>
        <Step.Title>Agent</Step.Title>
        <Step.Description>{ agent ? agent.name : 'Select RL agent'}</Step.Description>
      </Step.Content>
    </Step>

    <Step active={step === 1} disabled={step < 1}>
      <Icon name="envira" />
      <Step.Content>
        <Step.Title>Environment</Step.Title>
        <Step.Description>{ environment ? environment.name : 'Select environment'}</Step.Description>
      </Step.Content>
    </Step>

    <Step active={step === 2} disabled={step < 2}>
      <Icon name="configure" />
      <Step.Content>
        <Step.Title>Hyperparameters</Step.Title>
        <Step.Description>Configure search ranges</Step.Description>
      </Step.Content>
    </Step>

    <Step active={step >= 3} disabled={step < 3}>
      <Icon name="search" />
      <Step.Content>
        <Step.Title>Run Experiment</Step.Title>
        <Step.Description>Run the search</Step.Description>
      </Step.Content>
    </Step>
  </Step.Group>
);

LearningCurveStepper.propTypes = {
  step: PropTypes.number.isRequired,
  agent: PropTypes.shape({ name: PropTypes.string }).isRequired,
  environment: PropTypes.shape({ name: PropTypes.string }).isRequired,
  stepBackward: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  step: state.config.step,
  agent: state.config.agent,
});

export default connect(mapStateToProps)(LearningCurveStepper);
