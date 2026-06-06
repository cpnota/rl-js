import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import math from 'mathjs';

/* eslint-disable react/pure-stateless-function */
export default class LearningCurve extends React.PureComponent {
  render() {
    const {
      title, trials, width, height,
    } = this.props;
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
          width,
          height,
          margin: {
            l: 60,
            r: 30,
            t: 60,
            b: 55,
          },
        }}

        xaxis={{
          title: 'Episode',
        }}

        yaxis={{
          title: 'Returns',
        }}

        config={{
          displayModeBar: false,
        }}
      />
    );
  }
}

LearningCurve.propTypes = {
  title: PropTypes.string,
  trials: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  width: PropTypes.number,
  height: PropTypes.number,
};

LearningCurve.defaultProps = {
  title: 'Learning Curve',
  trials: [],
  width: 500,
  height: 450,
};
