import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import getTitleTag from '../../utils/getTitleTag';
import { IHeroHeadingProps } from './interface';

const HeroHeading: React.FC<IHeroHeadingProps> = ({ text, titleTag }) => {
  return (
    <Heading
      size="xlarge"
      color="white"
      tag={getTitleTag(titleTag || null) as any}
    >
      {text}
    </Heading>
  );
};

export default HeroHeading;
