import React from 'react';
import PropTypes from 'prop-types';
import configuration from '@rl-js/configuration';
import _flatten from 'lodash/flatten';
import { Dropdown } from 'semantic-ui-react';

const handleChange = onChange => (event, data) => onChange(JSON.parse(data.value));
const equal = (agent, _agent) => (
  agent && (agent.suite === _agent.suite) && (agent.id === _agent.id)
);

const AgentSelection = ({ environmentType, agent, onChange }) => (
  <Dropdown placeholder="Select Agent" text="Select Agent">
    <Dropdown.Menu>
      {_flatten(
        configuration.listAgentSuites(environmentType).map(suite => [
          <Dropdown.Header key={suite.getId()} content={suite.getName()} />,
          ...suite.listAgents().map(builder => ({
            suite: suite.getId(),
            id: builder.getId(),
            name: builder.getName(),
          })).map(_agent => (
            <Dropdown.Item
              key={_agent.id}
              value={JSON.stringify(_agent)}
              text={_agent.name}
              onClick={handleChange(onChange)}
              active={equal(agent, _agent)}
            />
          )),
        ]),
      )}
    </Dropdown.Menu>
  </Dropdown>
);

AgentSelection.propTypes = {
  environmentType: PropTypes.func.isRequired,
  agent: PropTypes.shape({ suite: PropTypes.string, id: PropTypes.string }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AgentSelection;
