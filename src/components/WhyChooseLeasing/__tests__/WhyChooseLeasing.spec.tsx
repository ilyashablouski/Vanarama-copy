import React from 'react';
import renderer from 'react-test-renderer';
import WhyChooseLeasing from '../WhyChooseLeasing';

describe('<WhyChooseLeasing />', () => {
  it('renders correctly with warranty equal N/A', () => {
    const getComponent = () => {
      return renderer.create(<WhyChooseLeasing warranty="N/A" />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with warranty', () => {
    const getComponent = () => {
      return renderer.create(<WhyChooseLeasing warranty="5" />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
