import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import Exponential from '@rl-js/configuration/hyperparameters/exponential';
import ParamSelector from './param-selector';
import RangeInput from './range-input';
import DivergenceToggle from './divergence-toggle';
import Contour from './contour';

const axisScale = param => (param.constructor.name === Exponential.name ? 'log' : 'linear');

export default class ContourPlot extends React.PureComponent {
  constructor(props) {
    super(props);
    const { definitions } = this.props;

    this.state = {
      paramX: definitions[0].getName(),
      xScale: axisScale(definitions[0]),
      paramY: definitions[1].getName(),
      yScale: axisScale(definitions[1]),
      min: undefined,
      max: undefined,
      showDivergence: false,
    };
  }

  setShowDivergence = (value) => {
    this.setState({
      showDivergence: value,
    });
  }

  setParamX = (value) => {
    const { definitions } = this.props;
    this.setState({
      paramX: value,
      xScale: axisScale(definitions.find(({ name }) => name === value)),
    });
  }

  setParamY = (value) => {
    const { definitions } = this.props;
    this.setState({
      paramY: value,
      yScale: axisScale(definitions.find(({ name }) => name === value)),
    });
  }

  setMin = (event) => {
    this.setState({
      min: Number.parseFloat(event.target.value) || undefined,
    });
  }

  setMax = (event) => {
    this.setState({
      max: Number.parseFloat(event.target.value) || undefined,
    });
  }

  render() {
    const { definitions } = this.props;
    const {
      paramX, paramY, showDivergence,
    } = this.state;
    return (
      <Container style={{ width: '500px' }}>
        <ParamSelector definitions={definitions} label="X" param={paramX} onChange={this.setParamX} />
        <ParamSelector definitions={definitions} label="Y" param={paramY} onChange={this.setParamY} />
        <RangeInput label="min" onChange={this.setMin} />
        <RangeInput label="max" onChange={this.setMax} />
        <DivergenceToggle value={showDivergence} onChange={this.setShowDivergence} />
        <Contour {...this.props} {...this.state} />
      </Container>
    );
  }
}

ContourPlot.propTypes = {
  definitions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  results: PropTypes.arrayOf(PropTypes.array).isRequired,
  title: PropTypes.string.isRequired,
};
