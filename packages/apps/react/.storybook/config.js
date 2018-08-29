import { configure } from '@storybook/react';

function loadStories() {
  require('../src/__stories__');
}

configure(loadStories, module);
