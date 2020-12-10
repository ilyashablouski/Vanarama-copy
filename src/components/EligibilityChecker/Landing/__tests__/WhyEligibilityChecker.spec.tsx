import React from 'react';
import preloadAll from 'jest-next-dynamic';
import renderer from 'react-test-renderer';
import WhyEligibilityChecker from '../WhyEligibilityChecker';

const getComponent = () => {
  return renderer
    .create(
      <WhyEligibilityChecker
        title="Why Use Our Car Lease Eligibility Checker?"
        body="If you're looking to drive a brand new car, van or truck without any of the hassle - leasing might just be for you! It's affordable, simple and you're not left with a depreciating asset at the end of your contract."
        image={
          {
            title: 'title',
            file: {
              url:
                'https://source.unsplash.com/collection/2102317/1000x650?sig=40344',
            } as any,
          } as any
        }
        iconList={[{ text: 'text' }]}
      />,
    )
    .toJSON();
};

describe('<WhyEligibilityChecker />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
