import React from 'react';
import configuration from '@rl-js/configuration';
import _flatten from 'lodash/flatten';
import { Dropdown } from 'semantic-ui-react';

const handleChange = onChange => (event, data) => onChange(JSON.parse(data.value));
const equal = (environment, _environment) => environment && (environment.suite === _environment.suite) && (environment.id === _environment.id);

const EnvironmentSelection = ({ environmentType, environment, onChange }) => (
  <Dropdown placeholder="Select Environment" text="Select Environment">
    <Dropdown.Menu>
      {_flatten(
        configuration.listEnvironmentSuites(environmentType).map(suite => [
          <Dropdown.Header key={suite.getId()} content={suite.getName()} />,
          ...suite.listEnvironments().map(builder => ({
            suite: suite.getId(),
            id: builder.getId(),
            name: builder.getName(),
          })).map(_environment => (
            <Dropdown.Item
              key={_environment.id}
              value={JSON.stringify(_environment)}
              text={_environment.name}
              onClick={handleChange(onChange)}
              active={equal(environment, _environment)}
            />
          )),
        ]),
      )}
    </Dropdown.Menu>
  </Dropdown>
);

export default EnvironmentSelection;
