import renderer from 'react-test-renderer';
import React from 'react';

import Head from '../Head';

const props = {
  title: 'Page Title',
};

describe('<Head />', () => {
  it('renders correctly', () => {
    const getComponent = () => {
      return renderer.create(<Head title={props.title} />).toJSON();
    };
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
