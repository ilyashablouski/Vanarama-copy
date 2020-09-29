import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import RouterLink from '../../components/RouterLink/RouterLink';
import { GenericPageQuery_genericPage_sections as Section } from '../../../generated/GenericPageQuery';
import getFeaturedHtml from './getFeaturedHtml';
import TilesContainer from '../TilesContainer/TilesContainer';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

interface IProps {
  sections: Section | null;
  title: string | null;
  body: string | null;
}

const FeaturedAndTilesContainer: FC<IProps> = ({ title, body, sections }) => {
  const featured1 = sections?.featured1;
  const tiles = sections?.tiles;
  const featured2 = sections?.featured2;
  const featured3 = sections?.featured3;

  const featured1Html = getFeaturedHtml(featured1);
  const featured2Html = getFeaturedHtml(featured2);
  const featured3Html = getFeaturedHtml(featured3);

  return (
    <>
      <div className="row:title">
        <Breadcrumb />
        <Heading size="xlarge" color="black" tag="h1">
          {title}
        </Heading>
        <ReactMarkdown
          escapeHtml={false}
          source={body || ''}
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
            heading: props => (
              <Text {...props} size="lead" color="darker" tag="h3" />
            ),
            paragraph: props => <Text {...props} tag="p" color="darker" />,
          }}
        />
      </div>
      {featured1Html}
      {tiles && <TilesContainer tiles={tiles} />}
      {featured2Html}
      {featured3Html}
    </>
  );
};

export default FeaturedAndTilesContainer;
