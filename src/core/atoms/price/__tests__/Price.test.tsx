import React from 'react';
import renderer from 'react-test-renderer';

import Price from '..';
import { IPriceProps } from '../interfaces';

const optionalProps = {
  id: 'component',
  className: 'class',
  size: 'small' as const,
  color: 'orange' as const,
  price: 250.95,
};

function getComponent(props?: IPriceProps) {
  return renderer.create(<Price {...props} />).toJSON();
}

describe('<Price />', () => {
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const tree = getComponent(optionalProps);
    expect(tree).toMatchSnapshot();
  });
});
