import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';

/* eslint-disable react/pure-stateless-function */
export default class DivergenceRate extends React.PureComponent {
  render() {
    const { successes, divergences, title } = this.props;

    return (
      <Plot
        data={[{
          values: [successes, divergences],
          labels: ['Success', 'Diverged'],
          type: 'pie',
          marker: {
            colors: ['green', 'red'],
          },
        }]}

        layout={{
          title: `${title}`,
          width: 500,
        }}
      />
    );
  }
}

DivergenceRate.propTypes = {
  title: PropTypes.string,
  successes: PropTypes.number,
  divergences: PropTypes.number,
};

DivergenceRate.defaultProps = {
  title: 'Divergence Rate',
  successes: 0,
  divergences: 0,
};
