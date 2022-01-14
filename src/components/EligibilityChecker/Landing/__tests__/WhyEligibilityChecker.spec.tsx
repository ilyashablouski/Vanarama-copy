import React from 'react';
import preloadAll from 'jest-next-dynamic';
import renderer from 'react-test-renderer';

import { EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_featured2_image as IFeaturedImage } from '../../../../../generated/EligibilityCheckerPageData';

import WhyEligibilityChecker from '../WhyEligibilityChecker';

const featuredImage: IFeaturedImage = {
  title: 'title',
  description: 'description',
  file: {
    url: 'https://source.unsplash.com/collection/2102317/1000x650?sig=40344',
    fileName: 'file-name',
    details: {
      image: {
        width: 100,
        height: 100,
      },
    },
  },
};

const getComponent = () => {
  return renderer
    .create(
      <WhyEligibilityChecker
        title="Why Use Our Car Lease Eligibility Checker?"
        body="If you're looking to drive a brand new car, van or truck without any of the hassle - leasing might just be for you! It's affordable, simple and you're not left with a depreciating asset at the end of your contract."
        iconList={[{ text: 'text' }]}
        image={featuredImage}
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
