import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import React from 'react';
import { atomicDir } from '../../../helpers/atomicDirUtils';
import Accordion from './Accordion';
import { IAccordionItem } from './AccordionItem';

const ITEMS: IAccordionItem[] = [
  {
    id: 1,
    title: 'Fugiat Labore Adipisicing Nisi Ipsum',
    children:
      'Consectetur eu esse cupidatat laborum duis laborum magna elit consectetur nulla minim non dolor dolor quis',
  },
  {
    id: 2,
    title: 'Eu Sit Occaecat Do Enim',
    children:
      'Consectetur eu esse cupidatat laborum duis laborum magna elit consectetur nulla minim non dolor dolor quis',
  },
  {
    id: 3,
    title: 'Et Dolor Exercitation Quis Adipisicing',
    children:
      'Consectetur eu esse cupidatat laborum duis laborum magna elit consectetur nulla minim non dolor dolor quis',
  },
];

storiesOf(`${atomicDir(base)}|Accordion`, module).add('Accordion', () => (
  <Accordion items={ITEMS} />
));
