import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import math from 'mathjs';
import update from 'lodash/update';

const Contour = ({
  results,
  paramX,
  paramY,
  xScale,
  yScale,
  title,
  min,
  max,
  showDivergence,
}) => {
  const resultMatrix = {};
  const x = [];
  const y = [];
  const z = [];

  // There may be multiple configurations for each paramX/paramY combo.
  // For example, same alpha and lambda, but different epsilon.
  // We want to average across these, so first, index all results
  // by paramX and paramY.
  results.forEach(([, {
    mean, hyperparameters, divergences, count,
  }]) => {
    if (!showDivergence && mean == null) return;
    update(resultMatrix, [hyperparameters[paramX], hyperparameters[paramY]],
      (arr = []) => {
        if (showDivergence) return arr.concat(divergences / (count + divergences));
        return arr.concat(mean);
      });
  });

  // Then, take the mean for each combination.
  Object.entries(resultMatrix).forEach(
    ([xVal, row]) => Object.entries(row).forEach(([yVal, means]) => {
      x.push(xVal);
      y.push(yVal);
      z.push(math.median([min, math.mean(means), max]));
    }),
  );

  return (
    <Plot
      data={[
        {
          type: 'contour',
          x,
          y,
          z,
        },
      ]}
      layout={{
        title,
        xaxis: {
          title: paramX,
          type: xScale,
        },
        yaxis: {
          title: paramY,
          type: yScale,
        },
        width: 500,
      }}
    />
  );
};

Contour.propTypes = {
  paramX: PropTypes.string.isRequired,
  paramY: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.array).isRequired,
  xScale: PropTypes.oneOf(['linear', 'log']),
  yScale: PropTypes.oneOf(['linear', 'log']),
  title: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  showDivergence: PropTypes.bool,
};

Contour.defaultProps = {
  xScale: 'linear',
  yScale: 'log',
  min: Number.NEGATIVE_INFINITY,
  max: Number.POSITIVE_INFINITY,
  showDivergence: false,
};

export default Contour;
