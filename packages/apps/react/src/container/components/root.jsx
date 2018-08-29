import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import Navbar from './navbar';
import Apps from './pages/apps';
import Welcome from './pages/welcome';

const components = {
  welcome: Welcome,
  apps: Apps,
};

const Root = ({ apps, Body }) => (
  <div>
    <Navbar />
    <Body appTypes={apps} />
  </div>
);

Root.propTypes = {
  apps: PropTypes.any, // eslint-disable-line
  Body: PropTypes.func.isRequired,
  // Worker: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  Body: components[state.navigation.activeTab],
});

export default connect(mapStateToProps)(Root);
