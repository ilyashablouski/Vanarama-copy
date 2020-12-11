import dynamic from 'next/dynamic';
// import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import getTitleTag from '../../utils/getTitleTag';
import { IHeroHeadingProps } from './interface';
import Skeleton from '../Skeleton';

const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const HeroHeading: React.FC<IHeroHeadingProps> = ({ text, titleTag }) => {
  if (!text) return <Skeleton count={2} />;

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
