import React from 'react';
import preloadAll from 'jest-next-dynamic';
import renderer from 'react-test-renderer';
import WhyChooseLeasing from '../WhyChooseLeasing';

describe('<WhyChooseLeasing />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
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
