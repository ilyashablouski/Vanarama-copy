import { ApolloError } from '@apollo/client';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';
import RouterLink from '../../components/RouterLink/RouterLink';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';
import { IBreadcrumb } from '../../types/breadcrumbs';
import { getSectionsData } from '../../utils/getSectionsData';
import {
  getPartnerProperties,
  isPartnerSessionActive,
} from '../../utils/partnerProperties';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const SchemaJSON = dynamic(() => import('core/atoms/schema-json'), {
  loading: () => <Skeleton count={1} />,
});
const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={4} />,
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
const ErrorMessage = dynamic(
  () => import('../../components/ErrorMessage/ErrorMessage'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface ISimplePageContainer {
  data: GenericPageQuery | undefined;
  loading?: boolean;
  error?: ApolloError | undefined;
}

const SimplePageContainer: React.FC<ISimplePageContainer> = prop => {
  const { data, loading, error } = prop;
  const metaData = getSectionsData(['metaData'], data?.genericPage);

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  // Check if partnership session is active to set partnership as home page link
  useEffect(() => {
    const breadcrumbsItems = metaData?.breadcrumbs?.map((el: IBreadcrumb) => ({
      link: { href: el.href || '', label: el.label },
    }));
    const partnerProperties = getPartnerProperties();
    const partnershipSessionActive = isPartnerSessionActive();
    if (partnerProperties && partnershipSessionActive) {
      breadcrumbsItems[0] = {
        link: {
          href: `/partnerships/${partnerProperties?.slug?.toLowerCase()}`,
          label: 'Home',
        },
      };
    }
    setBreadcrumbs(breadcrumbsItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const metaDataName = getSectionsData(['metaData', 'name'], data?.genericPage);
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const featuredImageUrl = getSectionsData(
    ['featuredImage', 'file', 'url'],
    data?.genericPage,
  );

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbs} />
        <Heading tag="h1" size="xlarge" color="black">
          {metaDataName}
        </Heading>
      </div>
      {featuredImageUrl && (
        <div className="row:bg-white -compact">
          <div className="row:featured-image">
            <Image
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              className="-white"
              size="expand"
              src={featuredImageUrl}
            />
          </div>
        </div>
      )}
      <div className="row:text -columns">
        <ReactMarkdown
          className="markdown"
          allowDangerousHtml
          source={data?.genericPage.body || ''}
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
            image: props => {
              const { src, alt } = props;
              return <img {...{ src, alt }} style={{ maxWidth: '100%' }} />;
            },
          }}
        />
      </div>
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={featuredImage} />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
    </>
  );
};

export default SimplePageContainer;
