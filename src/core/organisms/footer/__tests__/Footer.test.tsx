import React from 'react';
import renderer from 'react-test-renderer';

import Footer from '..';
import { IFooterProps } from '../interfaces';

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
} from '../__fixtures__';

const optionalProps = {
  id: 'component',
  className: 'class',
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
};

function getComponent(props?: Partial<IFooterProps>) {
  return renderer.create(<Footer {...props} />).toJSON();
}

describe('<Footer />', () => {
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const tree = getComponent(optionalProps);
    expect(tree).toMatchSnapshot();
  });
});
