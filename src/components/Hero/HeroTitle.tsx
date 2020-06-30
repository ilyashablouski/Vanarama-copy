import ReactMarkdown from 'react-markdown';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import { IHeroTitleProps } from './interface';

const HeroTitle: React.FC<IHeroTitleProps> = ({ text }) => {
  return (
    <Text tag="p" size="large" color="white">
      <ReactMarkdown source={text} />
    </Text>
  );
};

export default HeroTitle;
