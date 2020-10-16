import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import RouterLink from '../../components/RouterLink/RouterLink';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';
import TilesContainer from '../TilesContainer/TilesContainer';
import { FeaturedHtml } from './getFeaturedHtml';
import { getSectionsData } from '../../utils/getSectionsData';

interface IProps {
  data: GenericPageQuery | undefined;
}

const FeaturedAndTilesContainer: FC<IProps> = ({ data }) => {
  const title = getSectionsData(['metaData', 'name'], data?.genericPage);
  const body = getSectionsData(['body'], data?.genericPage);

  const featured1 = getSectionsData(
    ['sections', 'featured1'],
    data?.genericPage,
  );
  const tiles = getSectionsData(['sections', 'tiles'], data?.genericPage);
  const featured2 = getSectionsData(
    ['sections', 'featured2'],
    data?.genericPage,
  );
  const featured3 = getSectionsData(
    ['sections', 'featured3'],
    data?.genericPage,
  );

  return (
    <>
      <div className="row:title">
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
      <FeaturedHtml featured={featured1} />
      {tiles && <TilesContainer tiles={tiles} />}
      <FeaturedHtml featured={featured2} />
      <FeaturedHtml featured={featured3} />
    </>
  );
};

export default FeaturedAndTilesContainer;
