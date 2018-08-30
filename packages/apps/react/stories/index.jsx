import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import 'semantic-ui-css/semantic.min.css';

storiesOf('Storybook', module)
  .add('It works', () => <div>Hello World</div>);
