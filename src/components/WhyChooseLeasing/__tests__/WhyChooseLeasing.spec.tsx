import React from 'react';
import preloadAll from 'jest-next-dynamic';
import renderer from 'react-test-renderer';
import WhyChooseLeasing from '../WhyChooseLeasing';

describe('<WhyChooseLeasing />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('renders correctly with warranty equal null', () => {
    const warrantyDetails = { years: null, mileage: 5000 };
    const getComponent = () => {
      return renderer
        .create(<WhyChooseLeasing warrantyDetails={warrantyDetails} />)
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with warranty', () => {
    const warrantyDetails = { years: 5, mileage: 5000 };
    const getComponent = () => {
      return renderer
        .create(<WhyChooseLeasing warrantyDetails={warrantyDetails} />)
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
