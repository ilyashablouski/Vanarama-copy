import React from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Accordion = dynamic(() => import('core/molecules/accordion/Accordion'), {
  loading: () => <Skeleton count={1} />,
});

interface IWhyChooseVanaramaProps {
  title: string;
  accordionsData: {
    children: JSX.Element | string;
    id: number;
    title: string;
  }[];
}

const WhyChooseVanarama: React.FC<IWhyChooseVanaramaProps> = ({
  accordionsData,
  title,
}) => {
  return (
    <div className="tile--accordion">
      <Heading tag="h2" color="black" size="lead" className="pdp-section-title">
        {title}
      </Heading>
      <Accordion items={accordionsData} dataAbTestId="product-page_accordion" />
    </div>
  );
};

export default WhyChooseVanarama;
