import React, { useState } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Link from '@vanarama/uibook/lib/components/atoms/link';
import DOMPurify from 'dompurify';

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
      <Heading tag="span" color="black" size="lead">
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
