import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import React from 'react';
import List from '.';
import { atomicDir } from '../../../helpers/atomicDirUtils';
import Text from '../text';

storiesOf(`${atomicDir(base)}/List`, module).add('Default', () => (
  <List>
    <li>
      <Text color="darker" tag="p">
        We’ll call you to take a refundable £500 holding deposit. We’ll use this
        to order your vehicle from the dealer.
      </Text>
    </li>
    <li>
      <Text color="darker" tag="p">
        We’ll send you some finance documents to sign, which you can do on your
        smartphone.
      </Text>
    </li>
    <li>
      <Text color="darker" tag="p">
        We’ll arrange everything to get your car delivered straight to your
        door, free of charge!
      </Text>
    </li>
  </List>
));
