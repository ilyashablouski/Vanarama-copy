import React from 'react';
import preloadAll from 'jest-next-dynamic';
import renderer from 'react-test-renderer';
import WhyChooseVanarama from '../WhyChooseVanarama';

describe('<WhyChooseVanarama />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('renders correctly', () => {
    const getComponent = () => {
      return renderer.create(<WhyChooseVanarama />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
