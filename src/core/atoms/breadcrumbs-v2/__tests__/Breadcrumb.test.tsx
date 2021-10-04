import React from 'react';
import renderer from 'react-test-renderer';

import Breadcrumbs from '../Breadcrumbs';
import { IBreadcrumbProps } from '../helpers';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
  })),
});

const optionalProps = {
  dataTestId: 'breadcrumbs',
  items: [
    { link: { href: '/', label: 'Page1' } },
    { link: { href: '/', label: 'Page2' } },
    { link: { href: '/', label: 'Page3' } },
  ],
};

function getComponent(props?: IBreadcrumbProps) {
  return renderer.create(<Breadcrumbs {...props} />).toJSON();
}

describe('<Breadcrumbs />', () => {
  it('renders correctly with optional props', () => {
    const tree = getComponent(optionalProps);
    expect(tree).toMatchSnapshot();
  });
});
