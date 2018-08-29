/* eslint-disable global-require */
// make sure bit recognizes these dependencies
require('react-plotly.js');
require('plotly.js');
export const ContourPlot = require('./plots/contour').default;
export const DivergenceRate = require('./plots/divergence-rate').default;
export const LearningCurve = require('./plots/learning-curve').default;
export const Sensitivity = require('./plots/sensitivity').default;
export const RangeSelection = require('./selection/range').default;
export const AgentSelection = require('./selection/agent').default;
export const EnvironmentSelection = require('./selection/environment').default;
export const HyperparameterSelection = require('./selection/hyperparameter').default;
