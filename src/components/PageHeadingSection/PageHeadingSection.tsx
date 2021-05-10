import React from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../Skeleton';
import getTitleTag from '../../utils/getTitleTag';

interface IPageHeadingSection {
  titleTag?: string;
  header: string;
  description?: string;
}

const PageHeadingSection = ({
  titleTag,
  header,
  description,
}: IPageHeadingSection) => {
  const Heading = dynamic(() => import('core/atoms/heading'), {
    loading: () => <Skeleton count={1} />,
  });
  const Text = dynamic(() => import('core/atoms/text'), {
    loading: () => <Skeleton count={1} />,
  });
  return (
    <div className="row:lead-text">
      <Heading
        size="xlarge"
        color="black"
        tag={getTitleTag(titleTag || null) as keyof JSX.IntrinsicElements}
      >
        {header}
      </Heading>
      {description && (
        <Text tag="span" size="lead" color="darker">
          {description}
        </Text>
      )}
    </div>
  );
};

export default PageHeadingSection;
