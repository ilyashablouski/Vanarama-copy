import React from 'react';
import preloadAll from 'jest-next-dynamic';
import renderer from 'react-test-renderer';
import CustomerThing from '../CustomerThing';

const getComponent = () => {
  return renderer
    .create(
      <CustomerThing
        heading="What Do Our Customers Think?"
        description="More than 1,000 people use our Eligibility Checker every week to find out their likelihood of getting accepted to lease a new car lease."
      />,
    )
    .toJSON();
};

describe('<CustomerThing />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
