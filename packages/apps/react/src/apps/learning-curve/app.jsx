import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from './configure-store';
import LearningCurve from './components/learning-curve';

export default class LearningCurveApp extends React.Component {
  constructor(props) {
    super(props);
    const { registerHandler } = props;
    this.store = configureStore(registerHandler);
  }

  render() {
    return (
      <Provider store={this.store}>
        <LearningCurve {...this.props} />
      </Provider>
    );
  }
}

LearningCurveApp.propTypes = {
  registerHandler: PropTypes.func.isRequired,
  queueTasks: PropTypes.func.isRequired,
};
