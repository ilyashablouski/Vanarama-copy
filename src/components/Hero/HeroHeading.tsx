import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import { IHeroHeadingProps } from './interface';

const HeroHeading: React.FC<IHeroHeadingProps> = ({ text }) => {
  return (
    <Heading size="xlarge" color="white">
      {text}
    </Heading>
  );
};

export default HeroHeading;
