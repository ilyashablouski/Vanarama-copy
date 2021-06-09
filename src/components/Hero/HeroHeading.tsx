import React from 'react';
import Heading from 'core/atoms/heading';
import getTitleTag from '../../utils/getTitleTag';
import { IHeroHeadingProps } from './interface';
import Skeleton from '../Skeleton';

const HeroHeading: React.FC<IHeroHeadingProps> = ({
  text,
  titleTag,
  color = 'white',
}) => {
  if (!text) {
    return <Skeleton count={2} />;
  }

  return (
    <Heading
      size="xlarge"
      color={color}
      tag={getTitleTag(titleTag || 'h1') as keyof JSX.IntrinsicElements}
    >
      {text}
    </Heading>
  );
};

export default React.memo(HeroHeading);
