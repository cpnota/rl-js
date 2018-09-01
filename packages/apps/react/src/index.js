import React from 'react';
import ReactDOM from 'react-dom';
import './configure-rl';

import Container from './container';
import worker from 'workerize-loader!./worker'; // eslint-disable-line 
import registerServiceWorker from './register-service-worker';

import Visualizer from './apps/behavior-visualization';
import LearningCurveApp from './apps/learning-curve';
import HyperparameterSearchApp from './apps/hyperparameter-search';
import SensitivityAnalysisApp from './apps/sensitivity-analysis';

const apps = [
  Visualizer,
  HyperparameterSearchApp,
  LearningCurveApp,
  SensitivityAnalysisApp,
];

/* eslint-disable react/jsx-filename-extension */
/* This file is required to be called index.js by create-react-app */
ReactDOM.render(
  <Container apps={apps} worker={worker} />, document.getElementById('root'),
);
registerServiceWorker();
