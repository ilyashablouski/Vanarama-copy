import ReactMarkdown from 'react-markdown';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import { IHeroTitleProps } from './interface';
import RouterLink from '../RouterLink/RouterLink';

const HeroTitle: React.FC<IHeroTitleProps> = ({ text }) => {
  return (
    <Text tag="p" size="large" color="white">
      <ReactMarkdown
        source={text}
        disallowedTypes={['paragraph']}
        unwrapDisallowed
        renderers={{
          link: props => {
            const { href, children } = props;
            return <RouterLink link={{ href, label: children }} />;
          },
        }}
      />
    </Text>
  );
};

export default HeroTitle;
