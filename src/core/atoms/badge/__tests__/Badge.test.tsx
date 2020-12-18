import React from 'react';
import renderer from 'react-test-renderer';

import Badge from '..';
import { IBadgeProps } from '../interfaces';

const optionalProps = {
  id: 'component',
  className: 'class',
  size: 'small' as const,
  color: 'orange' as const,
  label: 'Badge',
};

function getComponent(props?: IBadgeProps) {
  return renderer.create(<Badge {...props} />).toJSON();
}

describe('<Badge />', () => {
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const tree = getComponent(optionalProps);
    expect(tree).toMatchSnapshot();
  });
});
