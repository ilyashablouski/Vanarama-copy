import { configure, addDecorator } from '@storybook/react';
import { withStyles } from 'storybook-addon-styles/react';
import { withConsole } from '@storybook/addon-console';

addDecorator(
  withStyles({
    padding: '1.5rem',
  }),
);
addDecorator((storyFn, context) => withConsole()(storyFn)(context));

import '../src/core/styles/base.scss';

const req = require.context('../src/core', true, /\.story\.(ts|tsx|js)$/);

configure(() => {
  req
    .keys()
    .forEach(filename => req(filename));
}, module);