import React from 'react';
import renderer from 'react-test-renderer';

import Link from '..';
import { ILinkProps } from '../interfaces';

const optionalProps = {
  id: 'component',
  className: 'class',
  size: 'small' as const,
  color: 'orange' as const,
  href: '#',
  plain: true,
  children: <span>Link</span>,
};

function getComponent(props?: ILinkProps) {
  return renderer.create(<Link {...props} />).toJSON();
}

describe('<Link />', () => {
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const tree = getComponent(optionalProps);
    expect(tree).toMatchSnapshot();
  });
});
