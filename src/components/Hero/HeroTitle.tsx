import ReactMarkdown from 'react-markdown';
// import Text from '@vanarama/uibook/lib/components/atoms/text';
import dynamic from 'next/dynamic';
import { IHeroTitleProps } from './interface';
import RouterLink from '../RouterLink/RouterLink';

const Text = dynamic(() =>
  import('@vanarama/uibook/lib/components/atoms/text'),
);

const HeroTitle: React.FC<IHeroTitleProps> = ({ text }) => {
  return (
    <Text tag="p" size="large" color="white">
      <ReactMarkdown
        escapeHtml={false}
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
