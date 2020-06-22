import renderer from 'react-test-renderer';
import React from 'react';

import Head from '../Head';

describe('<Head />', () => {
  it('renders correctly', () => {
    const getComponent = () => {
      return renderer.create(<Head />).toJSON();
    };
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
