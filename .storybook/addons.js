import { addons } from '@storybook/addons';
import vanaramaTheme from './vanaramaTheme';
import '@storybook/addon-actions/register';
import '@storybook/addon-controls/register';
import '@storybook/addon-viewport/register';

addons.setConfig({
  theme: vanaramaTheme,
});
