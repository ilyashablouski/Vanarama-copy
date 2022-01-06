import React from 'react';
import renderer from 'react-test-renderer';

import League from '..';
import { ILeagueProps } from '../interfaces';

const optionalProps = {
  altText: 'image1',
  link: '',
};

function getComponent(props?: ILeagueProps) {
  return renderer.create(<League {...props} link="" />).toJSON();
}

describe('<League />', () => {
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const tree = getComponent(optionalProps);
    expect(tree).toMatchSnapshot();
  });
});
