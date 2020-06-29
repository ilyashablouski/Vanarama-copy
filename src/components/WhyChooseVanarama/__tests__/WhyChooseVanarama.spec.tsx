import React from 'react';
import renderer from 'react-test-renderer';
import WhyChooseVanarama from '../WhyChooseVanarama';

describe('<WhyChooseVanarama />', () => {
  it('renders correctly', () => {
    const getComponent = () => {
      return renderer.create(<WhyChooseVanarama />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
