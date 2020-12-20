import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import Tabs from '.';
import { atomicDir } from '../../../helpers/atomicDirUtils';
import { TSize } from '../../../types/size';
import { TabAlignment, TabColorVariant } from './interfaces';
import Tab from './Tab';
import TabList from './TabList';
import TabPanel from './TabPanel';
import TabPanels from './TabPanels';

storiesOf(`${atomicDir(base)}|Tabs`, module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const [activeIndex, setActiveIndex] = useState(1);
    const align = select<TabAlignment>(
      'Alignment',
      ['start', 'center', 'expand'],
      'start',
    );

    const size = select<TSize>(
      'Size',
      ['xsmall', 'small', 'regular', 'lead', 'large'],
      'regular',
    );

    const variant = select<TabColorVariant>(
      'Variant',
      ['alternative', 'normal'],
      'normal',
    );

    return (
      <Tabs
        activeIndex={activeIndex}
        align={align}
        onChange={index => {
          action('onChange called')(index);
          setActiveIndex(index);
        }}
        size={size}
        variant={variant}
      >
        <TabList>
          <Tab index={1}>Tab one</Tab>
          <Tab index={2}>Tab two</Tab>
          <Tab index={3}>Tab three</Tab>
        </TabList>
        <TabPanels className="-pv-400">
          <TabPanel index={1}>
            <h1>Tab one</h1>
            <p>
              Fusce quis sollicitudin lacus, eu tristique mauris. Proin eu
              molestie turpis. Vivamus lobortis molestie eros, nec laoreet nibh
              elementum a. Integer urna risus, placerat eu leo a, dignissim
              porttitor nunc. Sed at mauris tristique, congue nunc eget,
              porttitor elit. Etiam.
            </p>
          </TabPanel>
          <TabPanel index={2}>
            <h1>Tab two</h1>
            <p>
              Cras dolor erat, elementum sit amet turpis rutrum, eleifend
              molestie urna. Pellentesque habitant morbi tristique senectus et
              netus et malesuada fames ac turpis egestas. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Quisque interdum turpis sit
              amet urna congue commodo.
            </p>
          </TabPanel>
          <TabPanel index={3}>
            <h1>Tab three</h1>
            <p>
              In sagittis tempus lacus. Nunc leo elit, fermentum convallis diam
              sit amet, euismod sodales ex. Interdum et malesuada fames ac ante
              ipsum primis in faucibus. Aenean eleifend interdum urna, eu
              imperdiet arcu. Curabitur volutpat mauris id purus mollis, et
              dignissim.
            </p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
  });
