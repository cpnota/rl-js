import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import * as navigation from '../actions/navigation';

const style = {
  borderRadius: 0,
  margin: 0,
};

const tabs = [
//   {
//   name: 'Welcome',
//   id: 'welcome',
// },
  {
    name: 'Experiments',
    id: 'apps',
  },
// {
//   name: 'Settings',
//   id: 'settings',
// }
];

const Navbar = ({ activeTab, setActiveTab }) => (
  <Menu style={style} inverted size="large">
    <Menu.Item header>
      RL-JS
    </Menu.Item>
    {tabs.map(({ name, id }) => (
      <Menu.Item
        name={name}
        key={id}
        onClick={() => setActiveTab(id)}
        active={activeTab === id}
      />
    ))}
  </Menu>
);

Navbar.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  activeTab: state.navigation.activeTab,
});

const mapDispatchToProps = dispatch => ({
  setActiveTab: tab => dispatch(navigation.setActiveTab(tab)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
