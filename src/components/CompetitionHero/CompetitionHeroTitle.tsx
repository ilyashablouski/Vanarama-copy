import React from 'react';
import ReactMarkdown from 'react-markdown';
import Text from 'core/atoms/text';
import { ICompetitionHeroTitleProps } from './interface';
import RouterLink from '../RouterLink/RouterLink';
import Skeleton from '../Skeleton';

const CompetitionHeroTitle: React.FC<ICompetitionHeroTitleProps> = ({
  text,
}) => {
  if (!text) return <Skeleton count={2} />;

  return (
    <Text tag="p" size="large" color="white">
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

export default React.memo(CompetitionHeroTitle);
