import React from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../Skeleton';
import getTitleTag from '../../utils/getTitleTag';
import { Nullish } from '../../types/common';

interface IPageHeadingSection {
  titleTag?: Nullable<string>;
  header: Nullish<string>;
  description?: Nullable<string>;
}

const HeadingSection = ({
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
    <section className="row:lead-text">
      <Heading
        size="xlarge"
        color="black"
        tag={getTitleTag(titleTag || null) as keyof JSX.IntrinsicElements}
      >
        {header || ''}
      </Heading>
      {description && (
        <Text tag="span" size="lead" color="darker">
          {description || ''}
        </Text>
      )}
    </section>
  );
};

export default HeadingSection;
