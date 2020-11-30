import dynamic from 'next/dynamic';
import getTitleTag from '../../utils/getTitleTag';
import { IHeroHeadingProps } from './interface';

const Heading = dynamic(() =>
  import('@vanarama/uibook/lib/components/atoms/heading'),
);

const HeroHeading: React.FC<IHeroHeadingProps> = ({ text, titleTag }) => {
  return (
    <Heading
      size="xlarge"
      color="white"
      tag={getTitleTag(titleTag || 'h1') as keyof JSX.IntrinsicElements}
    >
      {text}
    </Heading>
  );
};

export default HeroHeading;
