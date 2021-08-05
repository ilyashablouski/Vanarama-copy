import React from 'react';
import preloadAll from 'jest-next-dynamic';
import renderer from 'react-test-renderer';
import WhyChooseVanarama from '../WhyChooseVanarama';
import RouterLink from '../../RouterLink';

const ACCORDION_ITEMS = [
  {
    id: 1,
    title: 'Price Promise',
    children: (
      <>
        Our unique Price Promise means we’ll find you the very best deal on your
        chosen vehicle. And if you do find a competitors’ quote we can’t beat,
        we’ll give you £100.{' '}
        <RouterLink
          dataTestId="terms_and_conditions"
          link={{
            href: '/legal/terms-and-conditions.html',
            label: 'Full terms and conditions can be found here.',
            target: '_blank',
          }}
          classNames={{ size: 'regular', color: 'teal' }}
          key="terms_and_conditions"
        >
          Full terms and conditions can be found here.
        </RouterLink>
      </>
    ),
  },
  {
    id: 3,
    title: 'FREE 30-Day Returns',
    children: (
      <>
        If you change your mind up to 30 days after your vehicle has been
        delivered, you don’t have to worry! As long as haven&apos;t done more
        than 50 miles, we’ll collect it from wherever you are, free of charge.{' '}
        <RouterLink
          dataTestId="terms_and_conditions"
          link={{
            href: '/legal/terms-and-conditions.html',
            label: 'Full terms and conditions can be found here.',
            target: '_blank',
          }}
          classNames={{ size: 'regular', color: 'teal' }}
          key="terms_and_conditions"
        >
          Full terms and conditions can be found here.
        </RouterLink>
      </>
    ),
  },
  {
    id: 4,
    title: 'No Admin Fees',
    children:
      "Unlike many of our competitors, we won’t charge you anything to arrange your lease. You simply pay your initial payment and monthly rentals and we'll cover the rest.",
  },
  {
    id: 5,
    title: 'Rated Excellent On Trustpilot',
    children:
      'Delivering a 5-star service to you is at the heart of everything we do. That’s why we’re rated excellent on Trust Pilot for our customer service.',
  },
  {
    id: 6,
    title: 'FREE, Safe & Contactless Delivery',
    children:
      "There's no need to worry about the hassle of collecting your vehicle. Once it's ready, we’ll get it delivered straight to your door, drama-free.",
  },
];

describe('<WhyChooseVanarama />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('renders correctly', () => {
    const getComponent = () => {
      return renderer
        .create(
          <WhyChooseVanarama
            title="Why Choose Vanarama?"
            accordionsData={ACCORDION_ITEMS}
          />,
        )
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
