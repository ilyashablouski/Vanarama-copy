import React from 'react';
import renderer from 'react-test-renderer';
import WhyEligibilityChecker from '../WhyEligibilityChecker';

const getComponent = () => {
  return renderer.create(<WhyEligibilityChecker />).toJSON();
};

describe('<WhyEligibilityChecker />', () => {
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
