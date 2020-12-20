import React from 'react';
import renderer from 'react-test-renderer';

import Header from '..';
import { IHeaderProps } from '../interfaces';

import { topBarLinks, loginLink } from '../__fixtures__';

const optionalProps = {
  id: 'component',
  className: 'class',
  topBarLinks,
  loginLink,
  showIvan: false,
  message: '',
};

function getComponent(props?: Partial<IHeaderProps>) {
  return renderer.create(<Header {...props} />).toJSON();
}

describe('<Header />', () => {
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const tree = getComponent(optionalProps);
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with iVan CTA', () => {
    optionalProps.showIvan = true;
    const tree = getComponent(optionalProps);
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with message', () => {
    optionalProps.message = 'message';
    const tree = getComponent(optionalProps);
    expect(tree).toMatchSnapshot();
  });
});
