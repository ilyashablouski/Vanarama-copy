import React from 'react';
import renderer from 'react-test-renderer';

import Breadcrumb from '../Breadcrumb';
import { IBreadcrumbProps } from '../helpers';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const optionalProps = {
  items: [
    { link: { href: '/', label: 'Page1' } },
    { link: { href: '/', label: 'Page2' } },
    { link: { href: '/', label: 'Page3' } },
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
