import React from 'react';
import PropTypes from 'prop-types';
import configuration from '@rl-js/configuration';
import Fixed from '@rl-js/configuration/hyperparameters/fixed';
import RangeView from './view';

export default class RangeSelection extends React.Component {
  constructor(props) {
    super(props);

    const { agent } = props;

    this.state = {
      definitions: configuration
        .getAgentSuite(agent.suite)
        .getAgentBuilder(agent.id)
        .getHyperparameterDefinitions()
        .map(definition => ({
          definition,
          isFixed: false,
          fixed: new Fixed({ name: definition.getName(), value: definition.defaultValue() }),
        })),
    };
  }

  onSubmit = () => {
    const { onSubmit } = this.props;
    const { definitions } = this.state;
    onSubmit(definitions.map(({ definition, isFixed, fixed }) => (
      isFixed ? fixed : definition
    )));
  }

  setDefinition = (definition) => {
    this.setState(({ definitions }) => {
      const index = definitions.findIndex(d => d.definition.getName() === definition.getName());
      definitions[index].definition = definition; // eslint-disable-line no-param-reassign
      return { definitions };
    });
  }

  setFixed = (fixed) => {
    this.setState(({ definitions }) => {
      const index = definitions.findIndex(d => d.definition.getName() === fixed.getName());
      definitions[index].fixed = fixed; // eslint-disable-line no-param-reassign
      return { definitions };
    });
  }

  setIsFixed = (name, isFixed) => {
    this.setState(({ definitions }) => {
      const index = definitions.findIndex(d => d.definition.getName() === name);
      definitions[index].isFixed = isFixed; // eslint-disable-line no-param-reassign
      return { definitions };
    });
  }

  render() {
    const { definitions } = this.state;
    return (
      <RangeView
        definitions={definitions}
        onSubmit={this.onSubmit}
        setDefinition={this.setDefinition}
        setIsFixed={this.setIsFixed}
        setFixed={this.setFixed}
      />
    );
  }
}

RangeSelection.propTypes = {
  agent: PropTypes.shape({
    suite: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
