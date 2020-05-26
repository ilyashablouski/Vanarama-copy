import React from 'react';
import renderer from 'react-test-renderer';
import Lease from '../Lease';

const getComponent = () => {
  return renderer.create(<Lease />).toJSON();
};

describe('<Lease />', () => {
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
