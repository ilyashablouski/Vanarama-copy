import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import dynamic from 'next/dynamic';
import Heading from 'core/atoms/heading';
import RouterLink from '../../components/RouterLink';
import Skeleton from '../../components/Skeleton';
import { Nullish } from '../../types/common';
import { IHeading, IImage, ILink, IParagraph } from './interfaces';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  markdown: Nullable<string>;
  withoutImage?: boolean;
}

const getMarkdownRenderers = (withoutImage: Nullish<boolean>) => ({
  link: (props: ILink) => {
    const { href, children } = props;
    return (
      <RouterLink
        link={{ href, label: children }}
        classNames={{ color: 'teal' }}
      />
    );
  },
  image: (props: IImage) => {
    const { src, alt } = props;
    return !withoutImage ? (
      <img
        {...{ src, alt }}
        style={{
          maxWidth: '100%',
        }}
      />
    ) : null;
  },
  heading: (props: IHeading) => (
    <Heading {...props} size="lead" color="darker" tag="h3" />
  ),
  paragraph: (props: IParagraph) => <Text {...props} tag="p" color="darker" />,
});

const SearchPageMarkdown = ({ markdown, withoutImage }: IProps) => (
  <ReactMarkdown
    className="markdown"
    allowDangerousHtml
    source={markdown ?? ''}
    renderers={getMarkdownRenderers(withoutImage)}
  />
);
export default SearchPageMarkdown;
