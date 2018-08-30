import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from './configure-store';
import Root from './components/root';
import './index.css';

/* eslint-disable react/jsx-filename-extension */
/* Must be disabled for bitsrc to find the file. */
export default class App extends React.Component {
  constructor(props) {
    super(props);
    const { apps, worker } = props;
    this.store = configureStore({ apps, worker });
  }

  render() {
    const { apps } = this.props;
    return (
      <Provider store={this.store}>
        <Root apps={apps} />
      </Provider>
    );
  }
}

App.propTypes = {
  apps: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    Component: PropTypes.func,
  })).isRequired,
  worker: PropTypes.func.isRequired,
};
