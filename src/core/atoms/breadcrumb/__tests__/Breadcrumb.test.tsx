import React from 'react';
import renderer from 'react-test-renderer';

import Breadcrumb from '..';
import { IBreadcrumbProps } from '../interfaces';

const optionalProps = {
  id: 'component',
  className: 'class',
  items: [
    { label: 'Page1', href: '/' },
    { label: 'Page2', href: '/' },
    { label: 'Page3', href: '/' },
  ],
};

function getComponent(props?: IBreadcrumbProps) {
  return renderer.create(<Breadcrumb {...props} />).toJSON();
}

describe('<Breadcrumb />', () => {
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const tree = getComponent(optionalProps);
    expect(tree).toMatchSnapshot();
  });
});
