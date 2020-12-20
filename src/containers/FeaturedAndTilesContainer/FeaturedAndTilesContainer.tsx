import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import SchemaJSON from 'core/atoms/schema-json';
import RouterLink from '../../components/RouterLink/RouterLink';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';
import TilesContainer from '../TilesContainer/TilesContainer';
import { FeaturedHtml } from './getFeaturedHtml';
import { getSectionsData } from '../../utils/getSectionsData';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Breadcrumb = dynamic(
  () => import('../../components/Breadcrumb/Breadcrumb'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface IProps {
  data: GenericPageQuery | undefined;
  leasingOffers?: boolean;
}

const FeaturedAndTilesContainer: FC<IProps> = ({ data, leasingOffers }) => {
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
  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbsItems} />
        <Heading size="xlarge" color="black" tag="h1">
          {title}
        </Heading>
        <ReactMarkdown
          allowDangerousHtml
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
      {tiles && <TilesContainer leasingOffers={leasingOffers} tiles={tiles} />}
      <FeaturedHtml featured={featured2} />
      <FeaturedHtml featured={featured3} />
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={featuredImage} />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
    </>
  );
};

export default FeaturedAndTilesContainer;
