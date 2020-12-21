import React from 'react';
import renderer from 'react-test-renderer';

import Text from '../index';
import { ITextProps } from '../interfaces';

const optionalProps = {
  id: 'component',
  className: 'class',
  size: 'small' as const,
  color: 'orange' as const,
  children: 'Text text text text text text text text text text text',
};

function getComponent(props?: ITextProps) {
  return renderer.create(<Text {...props} />).toJSON();
}

describe('<Text />', () => {
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const tree = getComponent(optionalProps);
    expect(tree).toMatchSnapshot();
  });
});
