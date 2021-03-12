import React from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../Skeleton';
import RouterLink from '../RouterLink/RouterLink';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Accordion = dynamic(() => import('core/molecules/accordion/Accordion'), {
  loading: () => <Skeleton count={1} />,
});

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
            label: 'Terms and Conditions',
            target: '_blank',
          }}
          classNames={{ size: 'regular', color: 'teal' }}
          key="terms_and_conditions"
        >
          Terms and Conditions
        </RouterLink>{' '}
        apply
      </>
    ),
  },
  {
    id: 3,
    title: 'FREE 30-Day Returns',
    children: (
      <>
        If you change your mind up to 30 days after your vehicle has been
        delivered, you don’t have to worry! We’ll collect it from wherever you
        are, free of charge.{' '}
        <RouterLink
          dataTestId="terms_and_conditions"
          link={{
            href: '/legal/terms-and-conditions.html',
            label: 'Terms and Conditions',
            target: '_blank',
          }}
          classNames={{ size: 'regular', color: 'teal' }}
          key="terms_and_conditions"
        >
          Terms and Conditions
        </RouterLink>{' '}
        apply
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

interface IWhyChooseVanaramaProps {
  cars?: boolean;
  vans?: boolean;
  pickups?: boolean;
}

const WhyChooseVanarama: React.FC<IWhyChooseVanaramaProps> = ({
  cars,
  vans,
}) => {
  const items =
    cars || vans
      ? [
          ...ACCORDION_ITEMS.slice(0, 1),
          {
            id: 2,
            title: cars
              ? 'FREE Redundancy & Life Events Cover'
              : 'FREE Loss Of Earnings & Life Event Cover',
            children: (
              <>
                If something changes unexpectedly with your personal
                circumstances, the last thing you want to be worrying about is
                your vehicle. That’s why with Vanarama, if the worst happens,
                you can return it, hassle-free.{' '}
                <RouterLink
                  dataTestId="terms_and_conditions"
                  link={{
                    href: '/legal/terms-and-conditions.html',
                    label: 'Terms and Conditions',
                    target: '_blank',
                  }}
                  classNames={{ size: 'regular', color: 'teal' }}
                  key="terms_and_conditions"
                >
                  Terms and Conditions
                </RouterLink>{' '}
                apply
              </>
            ),
          },
          ...ACCORDION_ITEMS.slice(1),
        ]
      : ACCORDION_ITEMS;

  return (
    <div className="tile--accordion">
      <Heading tag="h2" color="black" size="lead" className="pdp-section-title">
        Why Choose Vanarama?
      </Heading>
      <Accordion items={items} />
    </div>
  );
};

export default WhyChooseVanarama;
