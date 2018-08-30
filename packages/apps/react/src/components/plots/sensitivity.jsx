import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';

const SensitivityPlot = ({ title, results }) => {
  const x = results.map(({ mean }) => mean);
  const y = results.map((result, i) => 1 - (i + 1) / results.length);

  return (
    <Plot
      data={[
        {
          type: 'scatter',
          x,
          y,
          fill: 'tozeroy',
        },
      ]}

      layout={{
        width: 500,
        title,
        xaxis: {
          title: 'Mean Returns',
          // type: 'log',
          autorange: true,
        },
        yaxis: {
          title: 'Percentage of Hyperparameters',
        },
      }}
    />
  );
};

SensitivityPlot.propTypes = {
  title: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.shape({ mean: PropTypes.number })).isRequired,
};

export default SensitivityPlot;
