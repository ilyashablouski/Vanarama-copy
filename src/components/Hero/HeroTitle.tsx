import React from 'react';
import ReactMarkdown from 'react-markdown';

import Text from 'core/atoms/text';
import Skeleton from '../Skeleton';
import RouterLink from '../RouterLink';
import { IHeroTitleProps } from './interface';

const HeroTitle: React.FC<IHeroTitleProps> = ({ className, text }) => {
  if (!text) {
    return <Skeleton count={2} />;
  }

  return (
    <Text className={className} tag="p" size="large" color="white">
      <ReactMarkdown
        allowDangerousHtml
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

export default React.memo(HeroTitle);
