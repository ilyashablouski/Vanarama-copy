import React from 'react';
import renderer from 'react-test-renderer';

import Heading from '..';
import { IHeadingProps } from '../interfaces';

const optionalProps = {
  id: 'component',
  className: 'class',
  size: 'small' as const,
  color: 'orange' as const,
  tag: 'p' as 'p',
};

function getComponent(props?: IHeadingProps) {
  return renderer.create(<Heading {...props} />).toJSON();
}

describe('<Heading />', () => {
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const tree = getComponent(optionalProps);
    expect(tree).toMatchSnapshot();
  });
});
