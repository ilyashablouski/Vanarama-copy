import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';
import CheckmarkDoneOutline from '../../assets/icons/CheckmarkDoneOutline';

import IconList, { IconListItem } from '.';

const list: string[] = [
  "Find out if you'll be accepted for credit with no impact on your credit score",
  'Get an instant answer',
  "It's free and easy",
  "We won't use or share your data",
];

storiesOf(`${atomicDir(base)}/IconList`, module)
  .add('Default', () => (
    <IconList>
      {list?.map((text: string) => (
        <IconListItem key={`${text}`}>{text}</IconListItem>
      ))}
    </IconList>
  ))
  .add('Checkmark orange', () => (
    <IconList>
      {list?.map((text: string) => (
        <IconListItem iconColor="orange" key={`${text}`}>
          {text}
        </IconListItem>
      ))}
    </IconList>
  ))
  .add('Text orange', () => (
    <IconList textColor="orange">
      {list?.map((text: string) => (
        <IconListItem iconColor="orange" key={`${text}`}>
          {text}
        </IconListItem>
      ))}
    </IconList>
  ))
  .add('Checkmark outline', () => (
    <IconList textColor="dark">
      {list?.map((text: string) => (
        <IconListItem listIcon={<CheckmarkDoneOutline />} key={`${text}`}>
          {text}
        </IconListItem>
      ))}
    </IconList>
  ));
