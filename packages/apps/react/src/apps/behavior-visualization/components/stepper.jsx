import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Step, Button } from 'semantic-ui-react';

const LearningCurveStepper = ({ step, agent, environment, stepBackward, setStep }) => (
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
        <Step.Description>Configure hyperparameters</Step.Description>
      </Step.Content>
    </Step>

    <Step active={step >= 3} disabled={step < 3}>
      <Icon name="chart line" />
      <Step.Content>
        <Step.Title>Run Experiment</Step.Title>
        <Step.Description>Generate the learning curve</Step.Description>
      </Step.Content>
    </Step>
  </Step.Group>
);

LearningCurveStepper.propTypes = {
  step: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  step: state.step,
  agent: state.agent,
});

export default connect(mapStateToProps)(LearningCurveStepper);
