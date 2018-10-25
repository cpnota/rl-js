import React from 'react';
import ReactDOM from 'react-dom';
import './configure-rl';

import Container from './container';
import worker from 'workerize-loader!./worker'; // eslint-disable-line 
import registerServiceWorker from './register-service-worker';

import LearningCurveApp from './apps/learning-curve';
import HyperparameterSearchApp from './apps/hyperparameter-search';
import SensitivityAnalysisApp from './apps/sensitivity-analysis';
import HCPI from './apps/hcpi';
// import BehaviorVisualizationApp from './apps/behavior-visualization';

const apps = [
  // BehaviorVisualizationApp, // not implemented
  HyperparameterSearchApp,
  LearningCurveApp,
  SensitivityAnalysisApp,
  HCPI,
];

/* eslint-disable react/jsx-filename-extension */
/* This file is required to be called index.js by create-react-app */
ReactDOM.render(
  <Container apps={apps} worker={worker} />, document.getElementById('root'),
);
registerServiceWorker();
