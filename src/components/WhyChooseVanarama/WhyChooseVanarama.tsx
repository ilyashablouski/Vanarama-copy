import React from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../Skeleton';

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
    children:
      'Our unique Price Promise means we’ll find you the very best deal on your chosen vehicle. And if you do find a competitors’ quote we can’t beat, we’ll give you £100*!',
  },
  {
    id: 2,
    title: 'Redundancy & Life Event Cover',
    children:
      'If something changes unexpectedly with your personal circumstances, the last thing you want to be worrying about is your vehicle. That’s why with Vanarama, if the worst happens, you can return it, hassle-free*.',
  },
  {
    id: 3,
    title: 'FREE 30-Day Returns',
    children:
      'If you change your mind up to 30 days after your vehicle has been delivered, you don’t have to worry! We’ll collect it from wherever you are, free of charge.',
  },
  {
    id: 4,
    title: 'No Admin Fees',
    children:
      "Unlike many of our competitors, we won’t charge you anything to arrange your lease. You simply pay your initial payment and monthly rentals and we'll cover the rest.",
  },
  {
    id: 5,
    title: 'Our Trust Pilot Score',
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

interface IWhyChooseVanaramaProps {}

const WhyChooseVanarama: React.FC<IWhyChooseVanaramaProps> = () => {
  return (
    <div className="tile--accordion">
      <Heading tag="h2" color="black" size="lead" className="pdp-section-title">
        Why Choose Vanarama?
      </Heading>
      <Accordion items={ACCORDION_ITEMS} />
    </div>
  );
};

export default WhyChooseVanarama;
