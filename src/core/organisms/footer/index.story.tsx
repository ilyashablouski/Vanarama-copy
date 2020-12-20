import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Footer from '.';

import {
  emailAddress,
  phoneNumber,
  openingTimes,
  headingZero,
  headingOne,
  headingTwo,
  headingThree,
  linkGroupOne,
  linkGroupTwo,
  linkGroupThree,
  legalText,
} from './__fixtures__';

storiesOf(`${atomicDir(base)}|Footer`, module).add('Default', () => (
  <Footer
    emailAddress={emailAddress}
    phoneNumber={phoneNumber}
    openingTimes={openingTimes}
    headingZero={headingZero}
    headingOne={headingOne}
    headingTwo={headingTwo}
    headingThree={headingThree}
    linkGroupOne={linkGroupOne}
    linkGroupTwo={linkGroupTwo}
    linkGroupThree={linkGroupThree}
    legalText={legalText}
  />
));
