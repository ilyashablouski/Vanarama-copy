import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import React, { useEffect, useState } from 'react';
import Breadcrumbs from 'core/atoms/breadcrumbs-v2';
import { IServiceBanner } from 'core/molecules/service-banner/interfaces';
import ServiceBanner from 'core/molecules/service-banner';
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
import { IErrorProps } from '../../types/common';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const SchemaJSON = dynamic(() => import('core/atoms/schema-json'), {
  loading: () => <Skeleton count={1} />,
});
const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={4} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const ErrorMessage = dynamic(
  () => import('../../components/ErrorMessage/ErrorMessage'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface ISimplePageContainer {
  data: GenericPageQuery | undefined;
  serviceBanner?: IServiceBanner;
  loading?: boolean;
  error?: IErrorProps;
}

const SimplePageContainer: React.FC<ISimplePageContainer> = prop => {
  const { data, loading, error, serviceBanner } = prop;
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
      <ServiceBanner
        enable={serviceBanner?.enable}
        message={serviceBanner?.message}
        link={serviceBanner?.link}
        className="-mb-500"
      />
      <div className="row:title">
        <Breadcrumbs items={breadcrumbs} />
        <Heading tag="h1" size="xlarge" color="black">
          {metaDataName}
        </Heading>
      </div>
      {featuredImageUrl && (
        <div className="row:bg-white -compact">
          <div className="row:featured-image">
            <ImageV2
              quality={70}
              optimisedHost
              lazyLoad={false}
              src={featuredImageUrl}
              className="-white"
              size="expand"
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
