import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import Skeleton from '../Skeleton';

const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Link = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/link'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface IIndependentReviewProps {
  review: any;
}

const IndependentReview: React.FC<IIndependentReviewProps> = ({ review }) => {
  const [readMore, toggleRead] = useState(true);
  const clearHtml = DOMPurify.sanitize(review);
  const props = {
    dangerouslySetInnerHTML: {
      __html: readMore ? `${clearHtml.slice(0, 400)}...` : clearHtml,
    },
  };
  return (
    <div className="tilebox -col-300 -p-400">
      <Heading tag="h2" color="black" size="lead">
        Independent Review By Car & Driving
      </Heading>
      <Text color="darker" size="regular" tag="p">
        <span {...props} />
        <Link color="teal" onClick={() => toggleRead(!readMore)}>
          {readMore ? 'Read More' : 'Read Less'}
        </Link>
      </Text>
    </div>
  );
};

export default IndependentReview;
