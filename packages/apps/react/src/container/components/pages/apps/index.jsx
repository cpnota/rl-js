import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Menu, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as appActions from '../../../actions/apps';
import NewApp from './new';

const paneStyle = {
  borderBottom: 0,
};

const closeButtonStyle ={
  padding: '1px',
  marginLeft: '1em',
};

const Apps = ({
  apps, appTypes, add, queueTasks, registerHandler, closeApp,
}) => (
  <Tab
    panes={apps.map(({ name, id, Component }) => ({
      menuItem: (
        <Menu.Item key={id}>
          {name}
          <Button style={closeButtonStyle} icon="close" size="tiny" onClick={() => closeApp(id)} />
        </Menu.Item>
      ),
      pane: (
        <Tab.Pane key={`pane-${id}`} style={paneStyle}>
          <Component queueTasks={queueTasks(id)} registerHandler={handler => registerHandler(id, handler)} />
        </Tab.Pane>
      ),
    })).concat({
      menuItem: (
        <Menu.Item icon="plus" key="addApp" />
      ),
      pane: (
        <Tab.Pane key="pane-new" style={paneStyle}>
          <NewApp appTypes={appTypes} add={add} />
        </Tab.Pane>
      ),
    })}
    renderActiveOnly={false}
  />
);

Apps.propTypes = {
  apps: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    Component: PropTypes.func,
  })).isRequired,
  appTypes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    Component: PropTypes.func,
  })).isRequired,
  add: PropTypes.func.isRequired,
  queueTasks: PropTypes.func.isRequired,
  registerHandler: PropTypes.func.isRequired,
  closeApp: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
  const { appTypes } = props;
  return {
    apps: Object.values(state.apps)
      .filter(({ closed }) => !closed)
      .map(app => ({
        ...app,
        Component: appTypes.find(type => type.name === app.type).Component,
      })),
  };
};

const mapDispatchToProps = dispatch => ({
  add: type => () => dispatch(appActions.addApp(type)),
  queueTasks: app => tasks => dispatch(appActions.queueTasks(app, tasks)),
  registerHandler: (app, handler) => dispatch(appActions.registerHandler(app, handler)),
  closeApp: app => dispatch(appActions.closeApp(app)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Apps);
