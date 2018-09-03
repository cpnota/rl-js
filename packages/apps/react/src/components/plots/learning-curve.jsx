import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import math from 'mathjs';

/* eslint-disable react/pure-stateless-function */
export default class LearningCurve extends React.PureComponent {
  render() {
    const { title, trials } = this.props;
    const episodes = math.transpose(trials);
    const mean = episodes.map(episode => math.mean(episode));
    const std = episodes.map(episode => math.std(episode));

    return (
      <Plot
        data={[
          {
            type: 'scatter',
            x: Array.from(mean.keys()),
            y: mean,
            error_y: {
              type: 'data',
              array: std,
              visible: true,
            },
            marker: { color: 'red' },
          },
        ]}

        layout={{
          title: `${title}`,
          width: 500,
          height: 400,
        }}

        xaxis={{
          title: 'Episode',
        }}

        yaxis={{
          title: 'Returns',
        }}
      />
    );
  }
}

LearningCurve.propTypes = {
  title: PropTypes.string,
  trials: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
};

LearningCurve.defaultProps = {
  title: 'Learning Curve',
  trials: [],
};
