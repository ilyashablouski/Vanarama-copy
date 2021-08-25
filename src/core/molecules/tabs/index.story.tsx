import React, { useState } from 'react';
import base from 'paths.macro';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { TSize } from '../../../types/size';
import { Nullish } from '../../../types/common';
import { TabAlignment, TabColorVariant } from './interfaces';
import { atomicDir } from '../../../helpers/atomicDirUtils';

import Tab from './Tab';
import TabList from './TabList';
import TabPanel from './TabPanel';
import TabPanels from './TabPanels';
import Tabs from '.';

const params = {
  args: {
    align: 'start',
    size: 'regular',
    variant: 'normal',
  },
  argTypes: {
    align: {
      options: ['start', 'center', 'expand'],
      control: { type: 'select' },
    },
    size: {
      options: ['xsmall', 'small', 'regular', 'lead', 'large'],
      control: { type: 'select' },
    },
    variant: {
      options: ['alternative', 'normal'],
      control: { type: 'select' },
    },
  },
};

interface ICustomArgs {
  align?: TabAlignment;
  variant?: TabColorVariant;
  size?: TSize;
}

storiesOf(`${atomicDir(base)}/Tabs`, module).add(
  'Default',
  (args: Nullish<ICustomArgs>) => {
    const [activeIndex, setActiveIndex] = useState(1);

    return (
      <Tabs
        {...args}
        activeIndex={activeIndex}
        onChange={index => {
          action('onChange called')(index);
          setActiveIndex(index);
        }}
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
  },
  params,
);
