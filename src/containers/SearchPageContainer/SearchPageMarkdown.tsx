import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import dynamic from 'next/dynamic';
import RouterLink from '../../components/RouterLink';
import Skeleton from '../../components/Skeleton';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  markdown: Nullable<string>;
  withoutImage?: boolean;
}

const SearchPageMarkdown = ({ markdown, withoutImage }: IProps) => {
  return (
    <ReactMarkdown
      className="markdown"
      allowDangerousHtml
      source={markdown ?? ''}
      renderers={{
        link: props => {
          const { href, children } = props;
          return (
            <RouterLink
              link={{ href, label: children }}
              classNames={{ color: 'teal' }}
            />
          );
        },
        image: props => {
          const { src, alt } = props;
          return !withoutImage ? (
            <img {...{ src, alt }} style={{ maxWidth: '100%' }} />
          ) : null;
        },
        heading: props => (
          <Text {...props} size="lead" color="darker" tag="h3" />
        ),
        paragraph: props => <Text {...props} tag="p" color="darker" />,
      }}
    />
  );
};

export default SearchPageMarkdown;
