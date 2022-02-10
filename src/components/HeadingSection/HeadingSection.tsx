import React from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../Skeleton';
import getTitleTag from '../../utils/getTitleTag';
import { Nullish } from '../../types/common';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IPageHeadingSection {
  titleTag?: Nullable<string>;
  header: Nullish<string>;
  description?: Nullable<string>;
  largeText?: boolean;
  dataUiTestId?: string;
}

const HeadingSection = ({
  titleTag,
  header,
  description,
  largeText,
  dataUiTestId,
}: IPageHeadingSection) =>
  header || description ? (
    <section className="row:lead-text">
      {header && (
        <Heading
          size={`${largeText ? 'large' : 'xlarge'}`}
          color="black"
          tag={getTitleTag(titleTag || null) as keyof JSX.IntrinsicElements}
          dataUiTestId={dataUiTestId ? `${dataUiTestId}_title` : undefined}
        >
          {header}
        </Heading>
      )}
      {description && (
        <Text
          tag="span"
          size="lead"
          color="darker"
          dataUiTestId={
            dataUiTestId ? `${dataUiTestId}_description` : undefined
          }
        >
          {description}
        </Text>
      )}
    </section>
  ) : null;

export default HeadingSection;
