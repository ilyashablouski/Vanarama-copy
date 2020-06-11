import React from 'react';
import renderer from 'react-test-renderer';

import Avatar from '..';
import { IAvatarProps } from '../interfaces';

const optionalProps = {
  id: 'component',
  className: 'class',
  src: 'https://www.thispersondoesnotexist.com/image',
  altText: 'Name',
};

function getComponent(props?: IAvatarProps) {
  return renderer.create(<Avatar {...props} />).toJSON();
}

describe('<Avatar />', () => {
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const tree = getComponent(optionalProps);
    expect(tree).toMatchSnapshot();
  });
});
