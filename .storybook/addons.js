import { addons } from '@storybook/addons';
import vanaramaTheme from './vanaramaTheme';
import '@storybook/addon-actions/register';
import '@storybook/addon-knobs/register';
import '@storybook/addon-viewport/register';

addons.setConfig({
  theme: vanaramaTheme,
});