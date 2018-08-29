import HyperparameterSearchApp from '../hyperparameter-search/app';

export default {
  name: 'Sensitivity Analysis',
  icon: 'chart area',
  Component: HyperparameterSearchApp({ sensitivity: true, title: 'Sensitivity Analysis' }),
};
