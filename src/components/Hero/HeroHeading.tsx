import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import { IHeroHeadingProps } from './interface';
import { getTitleTag } from 'utils/getTitleTag';

const HeroHeading: React.FC<IHeroHeadingProps> = ({ text, titleTag }) => {
  return (
    <Heading size="xlarge" color="white" tag={getTitleTag(titleTag || null) as any}>
      {text}
    </Heading>
  );
};

export default HeroHeading;
