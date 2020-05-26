import React from 'react';
import renderer from 'react-test-renderer';
import CustomerThing from '../CustomerThing';

const getComponent = () => {
  return renderer.create(<CustomerThing />).toJSON();
};

describe('<CustomerThing />', () => {
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
