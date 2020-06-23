import React from 'react';
import renderer from 'react-test-renderer';
import IndependentReview from '../IndependentReview';

describe('<IndependentReview />', () => {
  it('renders correctly with empty review', () => {
    const getComponent = () => {
      return renderer.create(<IndependentReview review="" />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with review', () => {
    const getComponent = () => {
      return renderer
        .create(<IndependentReview review="<h2>Test</h2>" />)
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
