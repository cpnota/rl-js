import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from './configure-store';
import Root from './components/root';

export default ({ sensitivity, title } = {}) => {
  class HyperparameterSearchApp extends React.Component {
    constructor(props) {
      super(props);
      const { registerHandler } = props;
      this.store = configureStore(registerHandler);
    }

    render() {
      return (
        <Provider store={this.store}>
          <Root {...this.props} sensitivity={sensitivity} title={title} />
        </Provider>
      );
    }
  }

  HyperparameterSearchApp.propTypes = {
    registerHandler: PropTypes.func.isRequired,
    queueTasks: PropTypes.func.isRequired,
  };

  return HyperparameterSearchApp;
};
